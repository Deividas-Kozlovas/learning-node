const express = require('express');
const path = require('path');
const router = express.Router();
const registerController = require('../controllers/registerController');
const validateRegistration = require('../middlewares/validation');

// Serve the registration page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register/register.html'));
});

// Apply validation middleware to the registration route
router.post('/submit-registration', validateRegistration, registerController.registerUser);

// Check email availability route without validation
router.post('/check-email', registerController.checkEmail);

module.exports = router;

// router.post('/check-email', (req, res, next) => {
//     console.log('check-email route hit');
//     next();
// }, registerController.checkEmail);