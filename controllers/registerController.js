const User = require('../models/User');

exports.checkEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'User already exists' });
        }
        return res.json({ success: true });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
