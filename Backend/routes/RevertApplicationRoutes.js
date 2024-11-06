const express = require('express');
const router = express.Router();
const revertApplication = require('../controller/revertApplication');

// Revert Application Route
router.put('/revert-certificate/:certificateId', revertApplication);

module.exports = router;
