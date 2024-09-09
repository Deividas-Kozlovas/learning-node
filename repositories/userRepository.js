// src/repositories/userRepository.js

const User = require('../models/User');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async createUser(data) {
        const user = new User(data);
        return await user.save();
    }
}


module.exports = new UserRepository();