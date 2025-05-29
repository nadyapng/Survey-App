const express = require('express');
const router = express.Router();
const authController = require('./authController');
const checkRole = require ('../../middleware/roleMiddleware');
//This is a route file and defines the endpoints related to authentication, directs requests to the correct controller functions 

// this is the route for register
router.post('/register', authController.registerUser);

// this is the route for login 
router.post('/login', authController.loginUser);

router.post('/ChangeCredentials',authController.ChangeCredentials)
// route protected by role
// router.post('/admin-only', checkRole(['admin']), (req, res) => {
//     res.json({ success: true, message: "Welcome, admin!" });
// });

module.exports = router;
