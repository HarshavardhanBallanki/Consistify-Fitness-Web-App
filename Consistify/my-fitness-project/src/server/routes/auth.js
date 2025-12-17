// This file manages authentication routes, including user registration and login.

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

// User registration route
router.post('/register', UserController.register);

// User login route
router.post('/login', UserController.login);

// Export the router
module.exports = router;