const Razorpay = require('razorpay');
require('dotenv').config();

// console.log( process.env.REACT_APP_KEY_ID)
// console.log(process.env.REACT_APP_KEY_SECRET)
const razorpay = new Razorpay({
    key_id: process.env.REACT_APP_KEY_ID,
    key_secret: process.env.REACT_APP_KEY_SECRET,
});

const checkout = async (req, res) => {
    console.log(req.body.amount)
    try {
        const options = {
            amount: req.body.amount * 100, // amount in smallest currency unit
       
            // amount:100,
            currency: 'INR',
            receipt:`receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send('Error creating Razorpay order');
    }
};

module.exports = checkout;
