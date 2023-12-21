const dbPool = require('../config/db.js');

// Fungsi leaderboard
// Fungsi leaderboard (maksimal 20 data)
const getLeaderboard = () => {
    const SQLQuery = `
        SELECT u.user_id, CONCAT(u.first_name, ' ', u.last_name) AS full_name, IFNULL(SUM(ur.skor), 0) AS skor
        FROM users u
        LEFT JOIN UserRecordings ur ON ur.user_id = u.user_id AND DATE(ur.createdAt) = CURDATE()
        GROUP BY u.user_id, u.first_name, u.last_name
        ORDER BY skor DESC
        LIMIT 20;
    `;
    return dbPool.execute(SQLQuery);
};


// Fungsi getSkorById
const getSkorById = (userId) => {
    const SQLQuery = `
        SELECT u.user_id, CONCAT(u.first_name, ' ', u.last_name) AS full_name, IFNULL(SUM(ur.skor), 0) AS skor
        FROM UserRecordings ur
        INNER JOIN users u ON ur.user_id = u.user_id
        WHERE u.user_id = ? AND DATE(ur.createdAt) = CURDATE()
        GROUP BY u.user_id, full_name;
    `;
    return dbPool.execute(SQLQuery, [userId]);
};


module.exports = {
    getLeaderboard,
    getSkorById,
};
