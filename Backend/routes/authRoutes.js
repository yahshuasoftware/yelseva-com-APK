const express = require('express');
const { login, signup } = require('../controller/AuthContoller');
const { signupValidation, loginValidation } = require('../middleware/AuthValidation');


const router = express.Router();

router.post('/login', loginValidation, login);  // Apply login validation
router.post('/signup', signupValidation, signup); // Apply signup validation

module.exports = router;
