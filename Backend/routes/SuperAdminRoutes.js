const express = require('express');
const { fetchAdminUsers, changeUserRole } = require('../controller/SuperAdminContoller');

const router = express.Router();

router.get('/adminusers', fetchAdminUsers);  // Fetch users with role 'admin'
router.post('/changerole', changeUserRole); // Change user role

module.exports = router;
