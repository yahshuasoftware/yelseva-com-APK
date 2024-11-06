const express = require('express');
const router = express.Router();
const checkout = require('../controller/PaymentContoller');

// POST route for Razorpay checkout
router.post('/checkout', checkout);

module.exports = router;
