const express = require('express');
const router = express.Router();
const qualtricsController = require('./qualtricsController');


// Route for creating a survey
router.post('/create-survey', qualtricsController.createSurvey);

// Route for creating a question
router.post('/create-question', qualtricsController.createQuestion)

// Route for getting a survey
router.get('/get-survey', qualtricsController.getSurvey)

// Route for getting a survey question
router.post('/get-question', qualtricsController.getQuestion)

// Added these routes for the data visualization parts
router.post('/export-survey', qualtricsController.initiateResponseExport); // Initiates survey export
router.post('/check-progress', qualtricsController.checkExportProgress); // Checks export progress
router.get('/download-survey', qualtricsController.downloadSurveyResponses); // Downloads the survey results

// This is for getting survey definition
router.get('/getSurveyDefinition', qualtricsController.getSurveyDefinition);
router.get('/getSurveys', qualtricsController.getAllSurveys);

module.exports = router;
