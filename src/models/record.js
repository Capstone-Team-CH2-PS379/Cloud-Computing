const dbPool = require('../config/db.js');

// Create
const createNewRecord = (userId, nativeAudioId, skor) => {
    const SQLQuery = 'INSERT INTO UserRecordings (user_id, native_audio_id, skor) VALUES (?, ?, ?)';
    return dbPool.execute(SQLQuery, [userId, nativeAudioId, skor]);
};

// Read
const getAllRecordings = () => {
    const SQLQuery = 'SELECT * FROM UserRecordings';
    return dbPool.execute(SQLQuery);
};

const getRecordingById = (recordingId) => {
    const SQLQuery = 'SELECT * FROM UserRecordings WHERE recording_id = ?';
    return dbPool.execute(SQLQuery, [recordingId]);
};

// Delete
const deleteRecording = (recordingId) => {
    const SQLQuery = 'DELETE FROM UserRecordings WHERE recording_id = ?';
    return dbPool.execute(SQLQuery, [recordingId]);
};

module.exports = {
    createNewRecord,
    getAllRecordings,
    getRecordingById,
    deleteRecording,
};
