const dbPool = require('../config/db.js');

// Create
const createNewRecord = (userId, nativeAudioId, audioRecordUrl, skor) => {
    const SQLQuery = 'INSERT INTO UserRecordings (user_id, native_audio_id, audio_record, skor) VALUES (?, ?, ?, ?)';
    return dbPool.execute(SQLQuery, [userId, nativeAudioId, audioRecordUrl, skor]);
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

// // Update
// const updateRecording = (recordingId, userId, nativeAudioId, audioRecordUrl, skor) => {
//     const SQLQuery = 'UPDATE UserRecordings SET user_id = ?, native_audio_id = ?, audio_record = ?, skor = ? WHERE recording_id = ?';
//     return dbPool.execute(SQLQuery, [userId, nativeAudioId, audioRecordUrl, skor, recordingId]);
// };

// Delete
const deleteRecording = (recordingId) => {
    const SQLQuery = 'DELETE FROM UserRecordings WHERE recording_id = ?';
    return dbPool.execute(SQLQuery, [recordingId]);
};

module.exports = {
    createNewRecord,
    getAllRecordings,
    getRecordingById,
    // updateRecording,
    deleteRecording,
};
