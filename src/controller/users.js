const usersModel = require('../models/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');


//validation schema
const userSchema = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).required()
});

// Skema Joi untuk validasi login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).required()
});

// validation schema end


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

// fitur register
const createNewUsers = async (req, res) => {
    // Validasi data input
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Invalid user data",
            error: error.details[0].message
        });
    }

    const { first_name, last_name, email, password } = req.body;
    try {
        // Enkripsi password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah salt rounds

        // Memasukkan user baru dengan password terenkripsi
        await usersModel.createNewUsers({ first_name, last_name, email, password: hashedPassword });

        res.status(201).json({
            message: 'CREATE user success',
            data: {first_name, last_name, email}
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
    let { first_name, last_name, email, password } = req.body;
    try {
        if(password){
            password = await bcrypt.hash(password, 10);
        }
        await usersModel.updateUsers({ first_name, last_name, email, password }, userId);
        res.json({
            message: "Update User success",
            data: {
                id: userId,
                first_name,
                last_name,
                email
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

//login
const login = async (req, res) => {

    // Validasi input
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Invalid email or password",
            error: error.details[0].message
        });
    }
    const { email, password } = req.body;
    try {
        const [users] = await usersModel.login(email);
        if (users.length === 0) {
            return res.status(401).json({
                message: 'Login failed, user not found',
                data: null
            });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: 'Login failed, password incorrect',
                data: null
            });
        }

         // Buat salinan dari objek user dan hapus password
         const userWithoutPassword = { ...user };
         delete userWithoutPassword.password;
        // Jika berhasil, buat token JWT
        const token = jwt.sign({ userId: users[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'Login successful',
            token: token,
            data: userWithoutPassword
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
    login
};
