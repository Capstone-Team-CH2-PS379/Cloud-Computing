// controller/audio.js
const { handleFileUpload } = require('../middleware/multer');

const createNewAudio = async (req, res) => {
  try {
    // Gunakan handleFileUpload untuk menangani penyimpanan file di Google Cloud Storage
    await handleFileUpload(req, res);

    // Dapatkan informasi file yang diunggah
    const uploadedFile = req.file;

    res.json({
      message: 'Upload Berhasil',
      fileUrl: uploadedFile.cloudStoragePublicUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Gagal mengunggah file audio',
    });
  }
};

module.exports = {
  createNewAudio,
};
