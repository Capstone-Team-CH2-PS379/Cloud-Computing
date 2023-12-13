const nativeModel = require('../models/native.js');

const getAllNatives = async (req, res) => {
    try {
        const [data] = await nativeModel.getAllNatives();
        res.json({
            message: 'Get All Natives success',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Server Error',
            ServerMessage: error
        });
    }
};

//mengambil audio berdasarkan id
const getNativeById = async (req, res) => {
    try{
        const {nativeAudioId} = req.params;
        console.log(nativeAudioId);
        const [native] = await nativeModel.getNativeById(nativeAudioId);
        res.json(native[0]);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Gagal Mengambil Data" });
    }
}

const createNewNative = async (req, res) => {
    try {
        const { category_id, text_audio, text_translate} = req.body;
        const uploadedFile = req.file;
        //mengecek apakah file di upload atau tidak
        if (!uploadedFile) {
            return res.status(400).json({ message: "Tidak ada file yang diunggah" });
        }

        const audioNativeUrl = uploadedFile.cloudStoragePublicUrl;
        //simpan ke database
        const [result] = await nativeModel.createNewNative(category_id, text_audio, audioNativeUrl, text_translate);
        res.status(201).json({
            message: 'CREATE native audio success',
            fileUrl: audioNativeUrl,
            recordingId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
            ServerMessage: error.message || error
        });
    }
};


const updateNative = async (req, res) => {
    const { nativeAudioId } = req.params;
    const { category_id, text_audio, text_translate } = req.body;
    const uploadedFile = req.file;

    try {
        let audioPath;

        // Jika file audio baru diunggah, gunakan URL baru
        if (uploadedFile) {
            audioPath = uploadedFile.cloudStoragePublicUrl;
        } else {
            return res.status(400).json({ message: "Tidak ada file yang diunggah" });
        }

        const [result]=await nativeModel.updateNative({ category_id, text_audio, audioPath, text_translate }, nativeAudioId);
        res.status(200).json({
            message: "Update Native Audio success",
            fileUrl: audioPath,
            data: {
                id: nativeAudioId,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};



const deleteNative = async (req, res) => {
    const { nativeAudioId } = req.params;
    try {
        await nativeModel.deleteNative(nativeAudioId);
        res.json({
            message: 'DELETE success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

// next materi
// Di controller/native.js

const getNextIncompleteNativeForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const [nextIncompleteNative] = await nativeModel.getNextIncompleteNativeForUser(userId);

        if (nextIncompleteNative.length === 0) {
            return res.status(404).json({ message: "Semua materi telah diselesaikan." });
        }

        res.json({
            message: "Materi selanjutnya yang belum diselesaikan",
            data: nextIncompleteNative[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



module.exports = {
    getAllNatives,
    createNewNative,
    updateNative,
    deleteNative,
    getNativeById,
    getNextIncompleteNativeForUser
};
