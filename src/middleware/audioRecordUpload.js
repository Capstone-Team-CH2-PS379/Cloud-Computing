const upload = require("../config/multer");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();

// Inisialisasi Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, "../../keyauth.json"),
  projectId: process.env.PROJECT_ID,
});

// Set Bucket Google Cloud Storage
const bucket = storage.bucket(process.env.BUCKET_NAME_RECORD);

const handleAudioRecord = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "File tidak ditemukan." });
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    console.error("Error saat menyimpan file ke Google Cloud Storage:", err);
    return res
      .status(500)
      .json({ message: "Gagal menyimpan file ke Google Cloud Storage." });
  });

  blobStream.on("finish", () => {
    req.file.cloudStorageObject = blob.name;
    req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    req.file.buffer = undefined;
    next();
  });

  blobStream.end(req.file.buffer);
};

module.exports = handleAudioRecord;
