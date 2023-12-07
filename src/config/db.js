 require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DBNAME,
});

module.exports = pool;
