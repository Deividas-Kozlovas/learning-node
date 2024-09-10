const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const UserRepository = require('../repositories/userRepository');

exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.this.state(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await UserRepository.findByEmail(email);
        if(!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res,struas(401).json({ error: 'Invalid credentials' });
        }

        req.session.userId = user._id;
        return res.json({ message: 'Login successful' });
    
    }catch (error) {
        console.error('Serrver error:' , error);
        return res.status(500).json({ error: 'Server error' });
    }
};