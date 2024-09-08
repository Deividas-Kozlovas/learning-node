// src/repositories/userRepository.js

const User = require('../models/userModel');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }
}

module.exports = new UserRepository();