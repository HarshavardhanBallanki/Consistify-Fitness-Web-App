// filepath: my-fitness-project/my-fitness-project/src/server/routes/api.js
const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');
const dietsController = require('../controllers/diets');
const usersController = require('../controllers/users');

// Workout routes
router.get('/workouts', workoutsController.getWorkouts);
router.post('/workouts', workoutsController.createWorkout);
router.get('/workouts/:id', workoutsController.getWorkoutById);
router.put('/workouts/:id', workoutsController.updateWorkout);
router.delete('/workouts/:id', workoutsController.deleteWorkout);

// Diet routes
router.get('/diets', dietsController.getDiets);
router.post('/diets', dietsController.createDiet);
router.get('/diets/:id', dietsController.getDietById);
router.put('/diets/:id', dietsController.updateDiet);
router.delete('/diets/:id', dietsController.deleteDiet);

// User routes
router.post('/users/register', usersController.registerUser);
router.post('/users/login', usersController.loginUser);
router.get('/users/:id', usersController.getUserProfile);
router.put('/users/:id', usersController.updateUserProfile);

module.exports = router;