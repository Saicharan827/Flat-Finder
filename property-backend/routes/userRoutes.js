const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser); // Register route
router.post('/login', loginUser);       // Login route
router.post('/logout', logoutUser);     // Logout route

module.exports = router;
