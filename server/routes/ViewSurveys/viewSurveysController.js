const viewSurveysHelper = require('../../database/viewSurveysHelper');
const qualtricsController = require('../Qualtrics/qualtricsController')

// Route to get all surveys for a given username
const getSurveysByUsername = async (req, res) => {
    const username = req.params.username;

    try {
        // Fetch all surveys for the given username
        const surveys = await viewSurveysHelper.getSurveysByUsername(username);

        if (surveys.length === 0) {
            res.status(404).send('No surveys found for this user');
            return;
        }

        // Loop through each survey and get additional survey details (e.g., SurveyStatus)
        const surveysWithStatus = await Promise.all(
            surveys.map(async (survey) => {
                const surveyDetails = await qualtricsController.getSurvey(survey.Qualtrics_Survey_ID);

                if (surveyDetails && surveyDetails.result) {
                    // Add survey status and any other relevant info to the survey object
                    return {
                        ...survey,
                        SurveyStatus: surveyDetails.result.SurveyStatus, // Extracting SurveyStatus from Qualtrics response
                    };
                } else {
                    // Handle case where survey details couldn't be fetched
                    return {
                        ...survey,
                        SurveyStatus: 'Unknown', // Default or error status
                    };
                }
            })
        );

        // Respond with the surveys along with their status
        res.status(200).json(surveysWithStatus);
    } catch (error) {
        console.error("Error fetching surveys by username:", error);
        res.status(500).send('Error fetching surveys');
    }
};


// Open/Close survey for participation 
const toggleStatus = async (req, res) => {
    // Example payload: {surveyId: '123', activate: true}
    const { surveyId, activate } = req.body; // Expecting the request body to contain `surveyId` and `activate` (boolean)

    // Validate that `surveyId` and `activate` are present in the request
    if (!surveyId || typeof activate !== 'boolean') {
        return res.status(400).send('Invalid request. Missing surveyId or activate flag.');
    }

    try {
        // Use the helper function to update survey status on Qualtrics (activate or deactivate)
        const response = await qualtricsController.updateSurveyStatus(surveyId, activate);

        if (response && response.status === 200) {
            const status = activate ? 'activated' : 'deactivated';
            return res.status(200).send(`Survey has been successfully ${status}.`);
        } else {
            return res.status(500).send('Failed to update survey status.');
        }
    } catch (error) {
        // Handle unexpected errors
        console.error('Error toggling survey status:', error);
        return res.status(500).send('An error occurred while updating the survey status.');
    }
};

// Delete past survey from Qualtrics and database
const deleteSurvey = async (req, res) => {
    console.log("params", req.params)
    const surveyId = req.params.surveyId // Extract surveyId from the request parameters

    try {
        // Call the Qualtrics helper function to delete the survey from Qualtrics
        const qualtricsResponse = await qualtricsController.deleteSurvey(surveyId);
        
        // Log the successful deletion response from Qualtrics
        console.log(`Qualtrics API response:`, qualtricsResponse);

        // If Qualtrics deletion is successful, attempt to delete the survey from the database
        try {
            const dbResponse = await viewSurveysHelper.deleteSurvey(surveyId);

            if (dbResponse.affectedRows === 0) {
                // If no rows were affected in the database, survey was not found
                return res.status(404).send({
                message: `No survey found with ID ${surveyId} in the database.`,
                });
            }

            // Success: survey deleted from both Qualtrics and the database
            return res.status(200).send({
                message: `Survey with ID ${surveyId} deleted successfully from both Qualtrics and the database.`,
                qualtricsStatus: qualtricsResponse
            });

        } catch (dbError) {
            console.error(`Error deleting survey from the database:`, dbError);
            // Handle database deletion error
            return res.status(500).send({
                message: 'Survey deleted from Qualtrics, but an error occurred while deleting it from the database.',
                error: dbError.message
            });
        }

    } catch (qualtricsError) {
        console.error(`Error deleting survey from Qualtrics:`, qualtricsError);
        // Handle Qualtrics deletion error
        return res.status(500).send({
        message: 'An error occurred while deleting the survey from Qualtrics.',
        error: qualtricsError.message
        });
    }
}

const getSurveyQuestions = async (req, res) => {
    const { surveyId } = req.params; // Extract surveyId from the request parameters

    try {
        const questionsData = await qualtricsController.getQuestions(surveyId);  // Fetch questions using the function
        // Handle error 
        if (!questionsData) {
            res.status(500).json({ message: 'Error fetching survey questions'});
        }
        res.status(200).json(questionsData.result.elements);  // Respond with the data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching survey questions', error: error.message });
    }
}


module.exports = { getSurveysByUsername, toggleStatus, deleteSurvey, getSurveyQuestions };