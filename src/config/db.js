 require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DBNAME,
});

// Fungsi untuk mengecek koneksi
async function checkConnection() {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        // Koneksi berhasil, lepaskan koneksi dan tidak perlu menampilkan apa-apa
        connection.release();
    } catch (error) {
        // Koneksi gagal, tampilkan error
        console.error('Unable to connect to MySQL', error);
        // Optional: Anda bisa menambahkan proses exit jika ingin menghentikan aplikasi
        process.exit(1);
    }
}

// Eksekusi pengecekan koneksi
checkConnection();

module.exports = pool;
