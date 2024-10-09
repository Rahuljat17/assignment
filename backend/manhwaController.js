const AWS = require('aws-sdk');
const multer = require('multer');
const { Pool } = require('pg');
const manhwaModel = require('../models/manhwaModel');

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

// Configure PostgreSQL client (RDS)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Fetch all manhwas
exports.getAllManhwas = async (req, res) => {
    try {
        const manhwas = await manhwaModel.getAllManhwas(pool);
        res.status(200).json(manhwas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Upload image to S3
exports.uploadImage = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error uploading image' });
        }

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `images/${Date.now()}_${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            ACL: 'public-read',
        };

        try {
            const data = await s3.upload(params).promise();
            res.status(200).json({ imageUrl: data.Location });
        } catch (err) {
            res.status(500).json({ error: 'Error uploading to S3' });
        }
    });
};

// Create new manhwa
exports.createManhwa = async (req, res) => {
    const { title, genre, description, imageUrl } = req.body;
    try {
        const manhwa = await manhwaModel.createManhwa(pool, { title, genre, description, imageUrl });
        res.status(201).json(manhwa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
