// This file contains functions that manage diet-related logic, including generating diet plans based on user preferences and nutritional needs.

const Diets = require('../models/Diets'); // Assuming you have a Diets model defined

// Function to get diet plans based on user preferences
const getDietPlans = async (req, res) => {
    try {
        const { preferences } = req.body; // Get user preferences from request body
        const dietPlans = await Diets.find({ preferences }); // Fetch diet plans based on preferences
        res.status(200).json(dietPlans); // Send diet plans as response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diet plans', error });
    }
};

// Function to create a new diet plan
const createDietPlan = async (req, res) => {
    try {
        const newDietPlan = new Diets(req.body); // Create a new diet plan from request body
        await newDietPlan.save(); // Save the diet plan to the database
        res.status(201).json(newDietPlan); // Send the created diet plan as response
    } catch (error) {
        res.status(500).json({ message: 'Error creating diet plan', error });
    }
};

// Function to update an existing diet plan
const updateDietPlan = async (req, res) => {
    try {
        const { id } = req.params; // Get diet plan ID from request parameters
        const updatedDietPlan = await Diets.findByIdAndUpdate(id, req.body, { new: true }); // Update the diet plan
        res.status(200).json(updatedDietPlan); // Send the updated diet plan as response
    } catch (error) {
        res.status(500).json({ message: 'Error updating diet plan', error });
    }
};

// Function to delete a diet plan
const deleteDietPlan = async (req, res) => {
    try {
        const { id } = req.params; // Get diet plan ID from request parameters
        await Diets.findByIdAndDelete(id); // Delete the diet plan
        res.status(204).send(); // Send no content response
    } catch (error) {
        res.status(500).json({ message: 'Error deleting diet plan', error });
    }
};

module.exports = {
    getDietPlans,
    createDietPlan,
    updateDietPlan,
    deleteDietPlan,
};