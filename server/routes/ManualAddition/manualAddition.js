const express = require('express');
const router = express.Router();
const manualAdditionController = require('./manualAdditionController')

// this is the route to get default MCQ template
router.get('/mcq', manualAdditionController.getMcqDefault);

// this is the route to get default MATRIX template
router.get('/matrix', manualAdditionController.getMatrixDefault);

// this is the route to get default TEXT template
router.get('/text', manualAdditionController.getTextDefault);

// this is the route to get default SLIDER template
router.get('/slider', manualAdditionController.getSliderDefault);

// this is the route to get default DESCRIPTIVE template
router.get('/descriptive', manualAdditionController.getDescriptiveDefault);


module.exports = router;
