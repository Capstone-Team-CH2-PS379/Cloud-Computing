const dbPool = require('../config/db');

// Mengambil semua audio natives
const getAllNatives = () => {
    const SQLQuery = 'SELECT * FROM audio_natives';
    return dbPool.execute(SQLQuery);
};

// mengambil audio natives berdasarkan id
const getNativeById = (nativeAudioId) => {
    const SQLQuery = 'SELECT * FROM audio_natives WHERE native_audio_id = ?';
    return dbPool.execute(SQLQuery, [nativeAudioId]);
};

// Membuat audio native baru
const createNewNative = (category_id, text_audio, audioNativeUrl, text_translate) => {
    const SQLQuery = 'INSERT INTO audio_natives (category_id, text_audio, audioPath, text_translate) VALUES (?, ?, ?, ?)';
    return dbPool.execute(SQLQuery, [category_id, text_audio, audioNativeUrl, text_translate]);
};

// Mengupdate audio native
const updateNative = (body, nativeAudioId) => {
    const SQLQuery = 'UPDATE audio_natives SET category_id = ?, text_audio = ?, audioPath = ?, text_translate = ? WHERE native_audio_id = ?';
    return dbPool.execute(SQLQuery, [category_id, text_audio, audioNativeUrl, text_translate, nativeAudioId]);
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
    getNativeById
};
