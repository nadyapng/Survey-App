// Import question formats
const mcqFormat = require('../../data/mcq_format.js');
const matrixFormat = require('../../data/matrix_format.js');
const sliderFormat = require('../../data/slider_format.js');
const textFormat = require('../../data/textInput_format.js');
const descriptiveFormat = require('../../data/descriptive_format.js');

// Get default MCQ template
const getMcqDefault = (req, res) => {
    res.json(mcqFormat.mcqDefault)
}

// Get default matrix template
const getMatrixDefault = (req, res) => {
    res.json(matrixFormat.matrixDefault)
}

// Get default slider template
const getSliderDefault = (req, res) => {
    res.json(sliderFormat.sliderDefault)
}

// Get default text-input template
const getTextDefault = (req, res) => {
    res.json(textFormat.textDefault)
}

// Get default descriptive template
const getDescriptiveDefault = (req, res) => {
    res.json(descriptiveFormat.descriptiveDefault)
}

module.exports = { getMcqDefault, getMatrixDefault, getSliderDefault, getTextDefault, getDescriptiveDefault };
