const express = require('express');
const router = express.Router();
const geminiController = require('./geminiController');
//This is a route file and defines the endpoints related to authentication, directs requests to the correct controller functions 

// this is the route for register
router.post('/generate-questions', geminiController.generateContent);

// // route for custom prompts (for debugging purposes)
// router.post('/generate', geminiController.generateContentCustom)


module.exports = router;
