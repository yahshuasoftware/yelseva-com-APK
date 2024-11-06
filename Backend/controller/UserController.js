const UserModel = require("../models/UserModel");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

// Fetch user profile by email
const getprofile = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).send('User not found');
    
    res.json(user); // Return the user details
  } catch (error) {
    res.status(500).send('Error fetching user profile: ' + error.message);
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Configure the AWS S3 client
const s3 = new S3Client({
  region: process.env.REACT_APP_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  },
});

// Function to upload a file to S3
const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.REACT_APP_BUCKET_NAME,
    Key: `documents/${Date.now()}-${file.filename}`, // Unique file name
    Body: fileStream,
    ContentType: file.mimetype, // Ensure correct file type
  };

  // Upload the file using PutObjectCommand
  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);

  // Construct the S3 URL
  return `https://${process.env.REACT_APP_BUCKET_NAME}.s3.${process.env.REACT_APP_BUCKET_REGION}.amazonaws.com/${uploadParams.Key}`;
};

const addCertificate = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch the user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle Proof of Identity and Address files
    const proofOfIdentityFiles = req.files['proofOfIdentity'] || [];
    const proofOfAddressFiles = req.files['proofOfAddress'] || [];

    // Upload identity documents to S3
    const proofOfIdentityUploads = await Promise.all(
      proofOfIdentityFiles.map(async (file) => {
        const s3Url = await uploadToS3(file);
        return {
          filename: file.filename,
          path: s3Url, // S3 URL
          mimetype: file.mimetype,
          size: file.size,
          documentType: 'proofOfIdentity', // Add document type
        };
      })
    );

    // Upload address documents to S3
    const proofOfAddressUploads = await Promise.all(
      proofOfAddressFiles.map(async (file) => {
        const s3Url = await uploadToS3(file);
        return {
          filename: file.filename,
          path: s3Url, // S3 URL
          mimetype: file.mimetype,
          size: file.size,
          documentType: 'proofOfAddress', // Add document type
        };
      })
    );

    // Merge the uploads into a single array
    const mergedUploads = [...proofOfIdentityUploads, ...proofOfAddressUploads];

    // Create a new certificate object
    const newCertificate = {
      certificateName: req.body.certificateName || 'Default Certificate Name',
      formFor: req.body.formFor,
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      status: 'pending',
      uploadedDocuments: mergedUploads, // Use merged uploads
    };

    // Add the new certificate to the user's certificates array
    user.certificatesApplied.push(newCertificate);

    // Save the updated user document
    await user.save();

    // Respond with success
    res.json({ message: 'Certificate added successfully', user });
  } catch (error) {
    console.error('Error adding certificate:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to update the status of a certificate
const updateCertificateStatus = async (req, res) => {
  try {
    const { userId, certificateId } = req.params; // Get the user ID and certificate ID from URL
    const { status } = req.body; // Get the new status from the request body

    // Ensure the status is one of the allowed values
    const allowedStatuses = ['pending', 'approved', 'rejected'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find the user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the certificate inside the user's certificatesApplied array by certificateId
    const certificate = user.certificatesApplied.id(certificateId);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Update the status of the certificate
    certificate.status = status;

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Certificate status updated successfully', certificate });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating certificate status', error: error.message });
  }
};

const uploadRevertDocsToCertificate = async (req, res) => {
  const { userId, certificateId } = req.params;

  try {
    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Locate the certificate by certificateId
    const certificate = user.certificatesApplied.id(certificateId);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Handle Proof of Identity and Address files
    const proofOfIdentityFiles = req.files['proofOfIdentity'] || [];
    const proofOfAddressFiles = req.files['proofOfAddress'] || [];

    // Upload identity documents to S3
    const proofOfIdentityUploads = await Promise.all(
      proofOfIdentityFiles.map(async (file) => {
        const s3Url = await uploadToS3(file);
        return {
          filename: file.filename,
          path: s3Url, // S3 URL
          mimetype: file.mimetype,
          size: file.size,
          documentType: 'proofOfIdentity',
        };
      })
    );

    // Upload address documents to S3
    const proofOfAddressUploads = await Promise.all(
      proofOfAddressFiles.map(async (file) => {
        const s3Url = await uploadToS3(file);
        return {
          filename: file.filename,
          path: s3Url, // S3 URL
          mimetype: file.mimetype,
          size: file.size,
          documentType: 'proofOfAddress',
        };
      })
    );

    // Append new uploads to the certificate’s uploadedDocuments array
    certificate.uploadedDocuments.push(...proofOfIdentityUploads, ...proofOfAddressUploads);
    certificate.status="pending"

    // Save updated user document
    await user.save();

    // Respond with success
    res.json({ message: 'Documents uploaded successfully', certificate });
  } catch (error) {
    console.error('Error uploading documents:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Controller to update user details
const updateUserDetails = async (req, res) => {
  const { userId } = req.params; // Assuming userId is provided in URL parameters
  const { name, number, email, address } = req.body;

  // Basic validation
  if (!userId || !name || !number || !email || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find the user by ID and update details
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, number, email, address },
      { new: true, runValidators: true }
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User details updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};






module.exports = {
  updateUserDetails,
  getprofile,
  deleteUser,
  getAllUsers,
  getUserById,
  createUser,
  addCertificate,
  updateCertificateStatus,
  uploadRevertDocsToCertificate
};
