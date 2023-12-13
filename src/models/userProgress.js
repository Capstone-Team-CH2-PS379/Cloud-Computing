const updateUserProgress = (userId, nativeAudioId) => {
    const SQLQuery = 'UPDATE user_progress SET last_completed_native_audio_id = ? WHERE user_id = ?';
    return dbPool.execute(SQLQuery, [nativeAudioId, userId]);
};

module.exports={
    updateUserProgress,
}
