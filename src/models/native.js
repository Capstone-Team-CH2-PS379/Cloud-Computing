const dbPool = require('../config/db');

// Mengambil semua audio natives
const getAllNatives = () => {
    const SQLQuery = 'SELECT * FROM audio_natives';
    return dbPool.execute(SQLQuery);
};

// Membuat audio native baru
const createNewNative = (body) => {
    const SQLQuery = 'INSERT INTO audio_natives (category_id, text_audio, audioPath) VALUES (?, ?, ?)';
    return dbPool.execute(SQLQuery, [body.category_id, body.text_audio, body.audioPath]);
};

// Mengupdate audio native
const updateNative = (body, nativeAudioId) => {
    const SQLQuery = 'UPDATE audio_natives SET category_id = ?, text_audio = ?, audioPath = ? WHERE native_audio_id = ?';
    return dbPool.execute(SQLQuery, [body.category_id, body.text_audio, body.audioPath, nativeAudioId]);
};

// Menghapus audio native
const deleteNative = (nativeAudioId) => {
    const SQLQuery = 'DELETE FROM audio_natives WHERE native_audio_id = ?';
    return dbPool.execute(SQLQuery, [nativeAudioId]);
};

module.exports = {
    getAllNatives,
    createNewNative,
    updateNative,
    deleteNative,
};
