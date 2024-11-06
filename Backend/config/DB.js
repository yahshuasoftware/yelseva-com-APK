// db.js
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        // Replace 'your_mongodb_uri' with your actual MongoDB connection string
        await mongoose.connect(
            process.env.REACT_APP_MONGODB_URI
        );
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
