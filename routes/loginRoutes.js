const express = require('express');
const { body } = require('express-validator');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Serve the login HTML file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/login.html'));
});

// Handle login form submission with validation
router.post(
    '/submit-login',
    [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').notEmpty().withMessage('Password cannot be empty')
    ],
    loginController.loginUser
);

module.exports = router;
