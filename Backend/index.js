const express = require("express");
const autoAssignCertificates = require("./controller/autoAssignCertificates"); // Adjust path if needed
require('dotenv').config();
const cors = require('cors');
const router = require('./App/index');
const connectDB = require("./config/DB");
const cron = require("node-cron");

const app = express();
app.use(express.static("uploads"));

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS setup
app.use(cors({
    origin: ['http://100.26.236.115:3000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.get("/app/health", (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});
// Define Routes
app.use("/app", router);

// Auto-assign certificates on server start
autoAssignCertificates();

// Schedule auto-assign task to run periodically (e.g., every hour)
cron.schedule("0 * * * *", () => {
    console.log("Running scheduled certificate assignment...");
    autoAssignCertificates();
});

// Start the server
const PORT = process.env.REACT_APP_PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
