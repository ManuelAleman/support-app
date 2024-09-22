const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerController = async (req, res) => {
    try {
        const { name, email, phone, password, passwordConfirm, role } = req.body;

        if (password !== passwordConfirm) {
            return res.status(400).json({
                status: 'fail',
                message: 'Passwords are not the same!'
            });
        }

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        await userModel.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role
        });
        
        res.status(201).json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}


exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not found'
            });
        }


        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(200).json({
            status: 'success',
            token
        });


    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}