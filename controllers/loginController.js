const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const UserRepository = require('../repositories/userRepository');

exports.loginUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Compare provided password with stored hash
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Set user session
        req.session.userId = user._id;
        return res.json({ message: 'Login successful' });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
