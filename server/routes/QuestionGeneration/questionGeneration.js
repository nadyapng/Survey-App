const express = require('express');
const router = express.Router();
const questionGenerationController = require('./questionGenerationController')


// Route to generate MCQ
router.post('/generate-mcq', questionGenerationController.generateMCQ)

// Route to generate Matrix question
router.post('/generate-matrix', questionGenerationController.generateMatrixQ)

// Route to generate text input question
router.post('/generate-text', questionGenerationController.generateTextQ)

// Route to generate slider question
router.post('/generate-slider', questionGenerationController.generateSliderQ)

// Route to generate descriptive
router.post('/generate-descriptive', questionGenerationController.generateDescriptiveQ)


module.exports = router;
