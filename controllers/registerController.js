// src/controllers/userController.js

const UserRepository = require('../repositories/userRepository');

const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    console.log('registerUser route hit');
    console.log('Request Body:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation Errors:', errors.array());
        return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        await UserRepository.createUser({ email, password });

        return res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.checkEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return res.json({ error: 'User already exists' });
        }
        return res.json({ success: true });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
