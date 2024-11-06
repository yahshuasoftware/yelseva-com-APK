const mongoose = require("mongoose");
const usermodel = require("../models/UserModel"); // Adjust the import according to your project

// Function to auto-assign pending certificates to admins
const autoAssignCertificates = async () => {
  try {
    // Step 1: Fetch all pending certificates
    const pendingCertificates = await usermodel.aggregate([
      { $unwind: "$certificatesApplied" }, // Unwind the certificatesApplied array
      { $match: { "certificatesApplied.status": "pending" } }, // Match only pending certificates
    ]);

    // Step 2: Fetch all admin users
    const admins = await usermodel.find({ role: "admin" });

    if (pendingCertificates.length === 0 || admins.length === 0) {
      console.log("No pending certificates or no admins found.");
      return;
    }

    const totalCertificates = pendingCertificates.length;
    const totalAdmins = admins.length;
    const certificatesPerAdmin = Math.floor(totalCertificates / totalAdmins);

    console.log(
      `Total Certificates: ${totalCertificates}, Total Admins: ${totalAdmins}, Certificates per Admin: ${certificatesPerAdmin}`
    );

    // Step 3: Clear previous assignments
    for (const admin of admins) {
      admin.assignedCertificates = []; // Clear previous assigned certificates
      await admin.save();
    }

    // Step 4: Distribute certificates evenly among admins
    let adminIndex = 0; // Round-robin admin selection
    for (let i = 0; i < pendingCertificates.length; i++) {
      const certificate = pendingCertificates[i];

      // Ensure the admin has an assignedCertificates array
      if (!admins[adminIndex].assignedCertificates) {
        admins[adminIndex].assignedCertificates = [];
      }

      // Assign certificate to the current admin
      admins[adminIndex].assignedCertificates.push(certificate.certificatesApplied);

      // Save the admin with the newly assigned certificate
      await admins[adminIndex].save();

      // Move to the next admin (round-robin)
      adminIndex = (adminIndex + 1) % totalAdmins;
    }

    console.log("Certificates assigned successfully.");
  } catch (error) {
    console.error("Error in auto-assigning certificates:", error);
  }
};

// Export the function
module.exports = autoAssignCertificates;
