const qualtricsController = require('../Qualtrics/qualtricsController');
const dbHelper = require('../../database/surveyGenerationFunctions');  // import database functions for survey generation

// Add all questions to the survey
const addAllQuestions = async (questions, surveyID) => {
    // Ensure questions is an array
    if (Array.isArray(questions)) {
        for (const [index, question] of questions.entries()) {
            try {
                // Await the addition of each question
                const addResponse = await qualtricsController.createQuestion(surveyID, question);

                // Check response
                if (!addResponse) {
                    console.log(`Failed to add question ${index}`, question);
                    return index;  // Return the index of the failed question
                }
            } catch (error) {
                console.error(`Error adding question ${index}:`, error);
                return index;  // Stop the loop and return the failed index
            }
        }

        return "success";
    } else {
        console.log("Invalid question array format");
        return null;
    }
};

// Activate survey and get survey link
const generateSurveyLink = async (surveyId) => {
    // Activate the survey
    const activateResponse = await qualtricsController.updateSurveyStatus(surveyId, true);
    if (!activateResponse) {
        return null;  // Return null if activation fails
    }

    console.log("Survey activated");
    const link = await qualtricsController.getAnonLink(surveyId);
    return link;
};

// Create a survey, add questions, and publish it
const publishSurvey = async (req, res) => {
    const username = req.body.username;
    const surveyName = req.body.surveyName;
    const questions = req.body.questions;

    // Check for missing fields
    if (!username || !surveyName || !questions || surveyName.trim() === "") {
        console.log("Request missing one or more fields");
        return res.status(400).send("Request needs username, surveyName, and questions fields");
    }

    // Create survey
    const surveyID = await qualtricsController.createSurvey(surveyName);
    if (!surveyID) {
        console.log("Failed to generate survey");
        return res.status(500).send("Failed to generate survey");
    }
    console.log("Survey generated on Qualtrics");

    // Add all questions to the survey
    const result = await addAllQuestions(questions, surveyID);
    if (result && result !== "success") {
        console.log(`Failed to add question ${result}`);
        return res.status(500).send(`Failed to add question ${result} to survey`);
    } else if (!result) {
        console.log("Invalid question array format");
        return res.status(400).send("Invalid question array format");
    }

    // Activate survey and get survey link
    const linkResponse = await generateSurveyLink(surveyID);
    if (!linkResponse) {
        return res.status(500).send("Failed to activate the survey");
    }

    // Record the current date and time
    const currentDate = new Date();
    const datePublished = currentDate.toISOString().split('T')[0];  // YYYY-MM-DD
    const timePublished = currentDate.toTimeString().split(' ')[0]; // HH:MM:SS

    try {
        // Insert into Survey table
        await dbHelper.insertSurvey(username, surveyID, surveyName, datePublished, timePublished, linkResponse);

        console.log("Data successfully inserted into Survey table");

        // Send survey link in response
        return res.status(200).json({ link: linkResponse });
    } catch (error) {
        console.error("Error inserting data into the database:", error);
        return res.status(500).send("Failed to insert data into the database");
    }
};

module.exports = { publishSurvey, generateSurveyLink, addAllQuestions };
