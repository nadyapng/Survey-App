const dbUtils = require('../dbtools/dbUtils');

/**
 * Fetches all survey entries for a given username.
 * @param {string} username - The username for which to retrieve surveys.
 * @returns {Promise} - A promise that resolves to the list of surveys for the user.
 */
const getSurveysByUsername = async (username) => {
    const query = `
        SELECT Survey_ID, Survey_Name, Date, Time, Qualtrix_link, Qualtrics_Survey_ID 
        FROM Survey 
        WHERE User_Name = ?;
    `;
    
    try {
        const surveys = await dbUtils.executeQuery(query, [username]);
        return surveys;
    } catch (error) {
        console.error("Error fetching surveys by username:", error);
        throw error;
    }
}


/**
 * Fetches all survey entries for a given username.
 * @param {string} surveyId - surveyId (Qualtrics) of the survey to be deleted.
 * @returns {Promise} - A promise that resolves to the result of the delete.
 */
const deleteSurvey = async (surveyId) => {
    try {
        // Call the dbUtils function to delete the survey from the 'Survey' table
        const result = await dbUtils.deleteRow('Survey', 'Qualtrics_Survey_ID', surveyId);
        return result;
    } catch (error) {
        console.error(`Error deleting survey with ID ${surveyId}:`, error);
        throw error;
    }
};


module.exports = {
    getSurveysByUsername,
    deleteSurvey
};