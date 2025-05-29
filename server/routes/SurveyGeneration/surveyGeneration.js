const express = require('express');
const router = express.Router();
const surveyGenerationController = require('./surveyGenerationController')


// Route to publish survey and generate link
router.post('/publish', surveyGenerationController.publishSurvey)

module.exports = router