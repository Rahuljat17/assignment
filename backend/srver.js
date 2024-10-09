require('dotenv').config();
const express = require('express');
const manhwaController = require('./controllers/manhwaController');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Manhwa routes
app.get('/api/manhwas', manhwaController.getAllManhwas); // Fetch list of manhwa
app.post('/api/upload', manhwaController.uploadImage); // Upload images to S3
app.post('/api/manhwa', manhwaController.createManhwa); // Add a new manhwa

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
