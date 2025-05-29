require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5003;


//setups for encryption - Rueien
const authRoutes = require('./routes/Authentication/auth'); //importing routes from auth.js
const geminiRoutes = require("./routes/Gemini/gemini");
const qualtricsRoutes = require("./routes/Qualtrics/qualtrics");
const questionGenerationRoutes = require("./routes/QuestionGeneration/questionGeneration");
const surveyGenerationRoutes = require("./routes/SurveyGeneration/surveyGeneration");
const viewSurveysRoutes = require("./routes/ViewSurveys/viewSurveys")
const manualAdditionRoutes = require('./routes/ManualAddition/manualAddition')

const bodyParser = require('body-parser');
const cors = require('cors');


// Middleware to handle JSON requests
app.use(express.json());
//needed for encryption - Rueien
app.use(cors());
app.use(bodyParser.json());
// // Routes for authenticatoin 
app.use('/api/auth', authRoutes);

// Routes for gemini generation
app.use('/api/gemini', geminiRoutes)

// Routes for qualtrics generation
app.use('/api/qualtrics', qualtricsRoutes)

// Routes for question generation
app.use('/question-gen', questionGenerationRoutes)

// Routes for survey generation (making and publishing)
app.use('/survey-gen', surveyGenerationRoutes)

// Routes for getting user surveys
app.use('/view-surveys', viewSurveysRoutes)

// Routes for getting default templates for manual addition
app.use('/manual-add', manualAdditionRoutes)

// Sample GET route
app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});




// POST route to handle input submission
app.post('/api/submit', (req, res) => {
    const userInput = req.body.input;
    console.log('Received input:', userInput);

    // Respond with a message
    res.json({ response: `You submitted: ${userInput}` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;