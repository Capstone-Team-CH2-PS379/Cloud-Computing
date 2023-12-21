const dbPool = require('../config/db');

// Mengambil semua isi users
const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';
    return dbPool.execute(SQLQuery);
};

// Membuat user baru
const createNewUsers = (body) => {
    const SQLQuery = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    return dbPool.execute(SQLQuery, [body.first_name, body.last_name, body.email, body.password]);
};

// Mengupdate data user
const updateUsers = (body, userId) => {
    const SQLQuery = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE user_id = ?';
    return dbPool.execute(SQLQuery, [body.first_name, body.last_name, body.email, body.password, userId]);
};

// Menghapus user
const deleteUsers = (userId) => {
    const SQLQuery = 'DELETE FROM users WHERE user_id = ?';
    return dbPool.execute(SQLQuery, [userId]);
};

// login user
const login = (email) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ?';
    return dbPool.execute(SQLQuery, [email]);
}

// Mengambil data user berdasarkan ID
const getUserById = (userId) => {
    const SQLQuery = 'SELECT * FROM users WHERE user_id = ?';
    return dbPool.execute(SQLQuery, [userId]);
};

module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers,
    login,
    getUserById,
};
