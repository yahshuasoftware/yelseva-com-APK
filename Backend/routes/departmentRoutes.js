// routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  addDepartment,
  getDepartments,
  addCertificates,
  getProofOfDocuments
} = require('../controller/DepartmentController');

// Route to add a new department
router.post('/departments', addDepartment);

// Route to get all departments
router.get('/departments', getDepartments);

// Route to add certificates to an existing department
router.post('/departments/add-certificates', addCertificates);

// Route to get proof of identity and address by certificate name
router.get('/documents/:certificateName', getProofOfDocuments);

module.exports = router;
