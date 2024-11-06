const express = require("express");
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();
const UserController = require("../controller/UserController");
const authenticateToken = require("../middleware/AuthMiddleware");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.REACT_APP_CLOUD_NAME, 
  api_key: process.env.REACT_APP_API_KEY,
  api_secret: process.env.REACT_APP_API_SECRET
});

// Ensure uploads directory exists
const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Directory to store files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname); // UUID + file extension
    cb(null, uniqueSuffix); // Unique filename
  }
});

// File filter to allow specific file types (optional)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/; // Allowed file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('File type not allowed'), false);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter, // Apply file filter
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5 MB
});

// Routes
router.get('/profile', authenticateToken, UserController.getprofile);
router.post('/users', UserController.createUser);
router.put('/update-user/:userId', UserController.updateUserDetails);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.delete('/users/:id', UserController.deleteUser);
router.put('/users/:userId/certificates/:certificateId/status', UserController.updateCertificateStatus);

// Add certificate with file uploads
router.post('/users/:id/certificates', upload.fields([
  { name: 'proofOfIdentity', maxCount: 2 },
  { name: 'proofOfAddress', maxCount: 2 }
]), UserController.addCertificate);

router.post('/users/:userId/certificates/:certificateId/revert', upload.fields([
  { name: 'proofOfIdentity', maxCount: 2 },
  { name: 'proofOfAddress', maxCount: 2 }
]), UserController.uploadRevertDocsToCertificate);

module.exports = router;
