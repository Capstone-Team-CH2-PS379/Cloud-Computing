const {Storage} = require('@google-cloud/storage');
require('dotenv').config(); // Menggunakan dotenv untuk membaca variabel lingkungan
const multer = require('multer');
const path = require('path');

//Inisialisasi google Cloud storage
const storage = new Storage({
    keyFilename: path.join(__dirname, '../../keyauth.json'),
    projectId: process.env.PROJECT_ID,
});

//Set Bucket Google CLud Storage
const bucket = storage.bucket(process.env.BUCKET_NAME);

// Konfigurasi penyimpanan Multer untuk Google CLoud Storage
const multerStorage = multer.memoryStorage();

// membuat limit ukuran file
const upload = multer({
    storage: multerStorage,
    limits:{
        fileSize: 10 * 1000 * 1000 // 10mb
    }
})

// Middleware untuk menangani unggahan file dan menyimpan di Google Cloud Storage
const handleFileUpload = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'File tidak ditemukan.' });
    }

    // Mengonversi file buffer ke readable stream
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
        console.error('Error saat menyimpan file ke Google Cloud Storage:', err);
        return res.status(500).json({ message: 'Gagal menyimpan file ke Google Cloud Storage.' });
    });

    blobStream.on('finish', () => {
        // File telah disimpan di Google Cloud Storage
        req.file.cloudStorageObject = blob.name;
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // Hapus file dari memori
        req.file.buffer = undefined;

        // Pastikan next adalah fungsi sebelum memanggilnya
        if (typeof next === 'function') {
            next();
        }
    });

    blobStream.end(req.file.buffer);
};



  module.exports = {
    upload,
    handleFileUpload,
  };
