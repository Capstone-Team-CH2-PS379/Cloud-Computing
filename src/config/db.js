const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'yourname',
    password: 'yourpassword',
    database: 'your database',
});

module.exports = pool;
