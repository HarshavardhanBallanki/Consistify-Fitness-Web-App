// filepath: my-fitness-project/my-fitness-project/src/server/services/exerciseApi.js
const axios = require('axios');

const EXERCISE_API_URL = 'https://api.exercise.com/v1/exercises'; // Replace with actual exercise API URL
const API_KEY = process.env.EXERCISE_API_KEY; // Ensure to set this in your .env file

const getExercises = async () => {
    try {
        const response = await axios.get(EXERCISE_API_URL, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        throw error;
    }
};

const getExerciseDetails = async (exerciseId) => {
    try {
        const response = await axios.get(`${EXERCISE_API_URL}/${exerciseId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for exercise ${exerciseId}:`, error);
        throw error;
    }
};

module.exports = {
    getExercises,
    getExerciseDetails
};