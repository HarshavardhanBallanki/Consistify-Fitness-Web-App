// filepath: my-fitness-project/my-fitness-project/src/server/controllers/users.js
const User = require('../models/User'); // Assuming you have a User model defined

// Function to register a new user
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newUser = new User({ username, password, email });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Function to get user profile
const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

// Function to update user preferences
const updateUserPreferences = async (req, res) => {
    const userId = req.params.id;
    const { preferences } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Preferences updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating preferences', error });
    }
};

module.exports = {
    registerUser,
    getUserProfile,
    updateUserPreferences,
};