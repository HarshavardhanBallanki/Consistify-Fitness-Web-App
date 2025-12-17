// filepath: /my-fitness-project/my-fitness-project/src/server/controllers/workouts.js
const Workout = require('../models/Workout'); // Assuming you have a Workout model defined

// Function to get all workout plans
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving workouts', error });
    }
};

// Function to get a specific workout plan by ID
const getWorkoutById = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving workout', error });
    }
};

// Function to create a new workout plan
const createWorkout = async (req, res) => {
    const newWorkout = new Workout(req.body);
    try {
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(400).json({ message: 'Error creating workout', error });
    }
};

// Function to update an existing workout plan
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: 'Error updating workout', error });
    }
};

// Function to delete a workout plan
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(id);
        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting workout', error });
    }
};

module.exports = {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};