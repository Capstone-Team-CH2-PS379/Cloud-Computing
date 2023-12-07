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

const createNewNative = async (req, res) => {
    const { body } = req;
    if (!body.category_id || !body.text_audio || !body.audioPath) {
        return res.status(400).json({
            message: "Incomplete native audio data",
            data: null
        });
    }
    try {
        await nativeModel.createNewNative(body);
        res.status(201).json({
            message: 'CREATE native audio success',
            data: body
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            ServerMessage: error
        });
    }
};

const updateNative = async (req, res) => {
    const { nativeAudioId } = req.params;
    const { body } = req;
    try {
        await nativeModel.updateNative(body, nativeAudioId);
        res.json({
            message: "Update Native Audio success",
            data: {
                id: nativeAudioId,
                ...body
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

module.exports = {
    getAllNatives,
    createNewNative,
    updateNative,
    deleteNative,
};
