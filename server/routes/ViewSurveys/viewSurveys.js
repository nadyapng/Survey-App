const express = require('express');
const router = express.Router();
const viewSurveysController = require('./viewSurveysController')

// Route to view surveys by username
router.get('/surveys/:username', viewSurveysController.getSurveysByUsername)

// Route to open/close survey
router.post('/toggle-status', viewSurveysController.toggleStatus)

// Route to delete survey from database and Qualtrics
router.delete('/delete-survey/:surveyId', viewSurveysController.deleteSurvey)

// Route to get a list of all questions from a past survey
router.get('/surveys/:surveyId/questions', viewSurveysController.getSurveyQuestions)

module.exports = router