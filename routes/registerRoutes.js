// routes/registrationRoutes.js
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/check-email', (req, res, next) => {
    console.log('check-email route hit');
    next();
}, registerController.checkEmail);

module.exports = router;