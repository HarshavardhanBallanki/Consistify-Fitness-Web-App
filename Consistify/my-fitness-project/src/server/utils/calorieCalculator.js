// This file contains utility functions for calculating calories consumed and burned based on user input and workout details.

const calculateCaloriesBurned = (weight, duration, MET) => {
    // MET (Metabolic Equivalent of Task) is a value that estimates the energy expenditure of physical activities.
    // Formula: Calories burned = MET * weight (kg) * duration (hours)
    return (MET * weight * (duration / 60)).toFixed(2);
};

const calculateCaloriesConsumed = (foodItems) => {
    // foodItems is an array of objects with properties: name and calories
    return foodItems.reduce((total, item) => total + item.calories, 0).toFixed(2);
};

const calculateCaloricDeficit = (caloriesConsumed, caloriesBurned) => {
    return (caloriesConsumed - caloriesBurned).toFixed(2);
};

module.exports = {
    calculateCaloriesBurned,
    calculateCaloriesConsumed,
    calculateCaloricDeficit
};