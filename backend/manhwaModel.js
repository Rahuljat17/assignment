// Fetch all manhwas
exports.getAllManhwas = async (pool) => {
    const query = 'SELECT * FROM manhwas';
    const result = await pool.query(query);
    return result.rows;
};

// Create a new manhwa
exports.createManhwa = async (pool, manhwa) => {
    const { title, genre, description, imageUrl } = manhwa;
    const query = 'INSERT INTO manhwas (title, genre, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [title, genre, description, imageUrl];
    const result = await pool.query(query, values);
    return result.rows[0];
};
