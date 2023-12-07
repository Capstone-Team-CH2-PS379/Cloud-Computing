const usersModel = require('../models/users.js');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await usersModel.getAllUsers();
        res.json({
            message: 'Get All Users success',
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

const createNewUsers = async (req, res) => {
    const { body } = req;
    if (!body.first_name || !body.last_name || !body.email || !body.password) {
        return res.status(400).json({
            message: "Incomplete user data",
            data: null
        });
    }
    try {
        await usersModel.createNewUsers(body);
        res.status(201).json({
            message: 'CREATE user success',
            data: body
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            ServerMessage: error
        });
    }
};

const updateUsers = async (req, res) => {
    const { userId } = req.params;
    const { body } = req;
    try {
        await usersModel.updateUsers(body, userId);
        res.json({
            message: "Update User success",
            data: {
                id: userId,
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

const deleteUsers = async (req, res) => {
    const { userId } = req.params;
    try {
        await usersModel.deleteUsers(userId);
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
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers,
};
