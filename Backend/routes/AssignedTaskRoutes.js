const express = require("express");
const getAssignedTasks = require("../controller/getAssignedCertificates");

const {updateCertificateStatusById} = require("../controller/updateCertificateStatusById");

const router = express.Router();

// Route to fetch assigned tasks for a user by user ID from params
router.get("/assigned-tasks/:userId", getAssignedTasks);
router.put('/certificates/:certificateId/status', updateCertificateStatusById);
module.exports = router;
