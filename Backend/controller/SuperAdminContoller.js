const UserModel = require("../models/UserModel"); // Ensure this path is correct

// Fetch users with role 'admin'
const fetchAdminUsers = async (req, res) => {
    try {
        const adminUsers = await UserModel.find({ role: 'admin' });
        res.status(200).json(adminUsers);
    } catch (error) {
        console.error("Error fetching admin users:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Change user role
const changeUserRole = async (req, res) => {
    const { userId, newRole } = req.body; // Expecting userId and newRole in the request body

    if (!userId || !newRole) {
        return res.status(400).json({ message: 'User ID and new role are required' });
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { role: newRole }, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Error changing user role:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    fetchAdminUsers,
    changeUserRole,
};
