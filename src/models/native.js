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

// next native
const getNextIncompleteNativeForUser = (userId) => {
    const SQLQuery = `
        SELECT * FROM audio_natives
        WHERE native_audio_id > (
            SELECT IFNULL(last_completed_native_audio_id, 0) FROM user_progress WHERE user_id = ?
        )
        ORDER BY native_audio_id ASC
        LIMIT 1;
    `;
    return dbPool.execute(SQLQuery, [userId]);
};

// Mengambil text_audio berdasarkan id
const getTextAudioById = (nativeAudioId) => {
    const SQLQuery = 'SELECT text_audio FROM audio_natives WHERE native_audio_id = ?';
    return dbPool.execute(SQLQuery, [nativeAudioId]);
};



module.exports = {
    getAllNatives,
    createNewNative,
    updateNative,
    deleteNative,
    getNativeById,
    getNextIncompleteNativeForUser,
    getTextAudioById

};
