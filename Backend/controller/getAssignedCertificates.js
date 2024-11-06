const usermodel = require("../models/UserModel");

// Function to fetch certificates assigned to a user
const getAssignedTasks = async (req, res) => {
  try {
    // Get the user ID from the URL parameters
    const userId = req.params.userId;

    // Fetch the user by ID
    const user = await usermodel.findById(userId).select("assignedCertificates role");

    // Ensure the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the assigned certificates for the user
    res.status(200).json({
      message: "Assigned tasks fetched successfully.",
      assignedCertificates: user.assignedCertificates,
    });
  } catch (error) {
    console.error("Error fetching assigned tasks:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = getAssignedTasks;
