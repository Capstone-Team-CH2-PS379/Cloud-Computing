const skorModel = require('../models/skor.js');

// Fungsi leaderboard
const getLeaderboard = async (req, res) => {
    try {
        const [data] = await skorModel.getLeaderboard();
        res.json({
            message: 'Get Leaderboard success',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

// Fungsi skorById
const getSkorById = async (req, res) => {
    const { userId } = req.params;
    try {
        const [data] = await skorModel.getSkorById(userId);
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Data not found',
                data: null
            });
        }
        res.json({
            message: 'Get Skor by ID success',
            data: data[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
};

module.exports = {
    getLeaderboard,
    getSkorById,
};
