const express = require('express');
const router = express.Router();

// Import routes
const servicesroutes = require('../routes/ServicesRoutes');
const authroutes = require("../routes/authRoutes");
const userroutes = require("../routes/userRoutes");
const departmentRoutes = require("../routes/departmentRoutes");
const paymentRoutes = require("../routes/PaymentRoutes");
const superAdminRoutes = require("../routes/SuperAdminRoutes");
const assignedTaskRoutes = require("../routes/AssignedTaskRoutes"); // Renamed for clarity

const revertroutes= require("../routes/RevertApplicationRoutes")

// Use routes
router.use("/api", servicesroutes);
router.use("/api", authroutes);
router.use("/api", userroutes);
router.use('/api', departmentRoutes);
router.use('/api/payment', paymentRoutes);
router.use("/api", superAdminRoutes);
router.use("/api", assignedTaskRoutes); // Corrected name
router.use("/api", revertroutes);


module.exports = router;
