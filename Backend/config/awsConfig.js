const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
require("dotenv").config();


console.log(process.env.REACT_APP_ACCESS_KEY)
console.log(process.env.REACT_APP_SECRET_ACCESS_KEY)
console.log(process.env.REACT_APP_BUCKET_REGION)
// Configure AWS with your credentials
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_BUCKET_REGION
});

const s3 = new AWS.S3();
console.log
// Create a multer instance for S3 uploads
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.REACT_APP_BUCKET_NAME,
    acl: 'public-read', // Make file publicly accessible via URL
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix); // Store file with a unique name in the bucket
    }
  }),
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(file.mimetype);
    
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
});

module.exports = upload;
