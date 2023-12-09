const createNewRecord = async (req, res) => {
  try {
    const uploadedFile = req.file;
    res.json({
      message: "Upload Berhasil",
      fileUrl: uploadedFile.cloudStoragePublicUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal Mengunggah File Audio",
    });
  }
};

module.exports = {
  createNewRecord,
};
