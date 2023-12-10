const recordModel = require('../models/record.js');

// Create
const createNewRecord = async (req, res) => {
    try {
        const { userId, nativeAudioId, skor } = req.body;

        const uploadedFile = req.file;

        if (!uploadedFile) {
            return res.status(400).json({ message: "Tidak ada file yang diunggah" });
        }

        const audioRecordUrl = uploadedFile.cloudStoragePublicUrl;
        // Simpan ke database
        const [result] = await recordModel.createNewRecord(userId, nativeAudioId, audioRecordUrl, skor);
        res.json({
            message: "Upload Berhasil",
            fileUrl: audioRecordUrl,
            recordingId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal Mengunggah File Audio" });
    }
};

// Read
const getAllRecords = async (req, res) => {
    try {
        const [records] = await recordModel.getAllRecordings();

        // Periksa apakah ada data di records
        if (records.length === 0) {
            return res.status(404).json({ message: "Tidak ada data " });
        }

        res.json({
            message: "Berhasil mengambil data",
            data: records
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal Mengambil Data" });
    }
};


const getRecordById = async (req, res) => {
    try {
        const recordingId = req.params.id;
        const [record] = await recordModel.getRecordingById(recordingId);

        if (record.length === 0) {
            return res.status(404).json({ message: "Data Tidak Ditemukan" });
        }

        res.json(record[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal Mengambil Data" });
    }
};


// Delete
const deleteRecord = async (req, res) => {
    try {
        const {recordingId} = req.params;
        await recordModel.deleteRecording(recordingId);
        res.json({ message: "Hapus Berhasil" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal Menghapus Data" });
    }
};

module.exports = {
    createNewRecord,
    getAllRecords,
    getRecordById,
    // updateRecord,
    deleteRecord
};
