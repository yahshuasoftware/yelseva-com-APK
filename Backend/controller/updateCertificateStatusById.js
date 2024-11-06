const User = require('../models/UserModel'); // Import the User model

// Controller to update certificate status by certificateId
const updateCertificateStatusById = async (req, res) => {
  const { certificateId } = req.params; // Extract certificateId from the request params
  const { newStatus } = req.body; // Extract the new status from the request body

  try {
    // Find the user that contains the certificate with the given certificateId
    const user = await User.findOne({ "certificatesApplied._id": certificateId });
    if (!user) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Find the certificate within the user's certificatesApplied array
    const certificate = user.certificatesApplied.id(certificateId);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Update the certificate status
    certificate.status = newStatus;

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: 'Certificate status updated successfully',
      updatedCertificate: certificate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { updateCertificateStatusById };
