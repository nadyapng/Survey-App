const dbUtils = require('../dbtools/dbUtils')

// Function to add new survey entry into Survey table
const insertSurvey = async (username, surveyID, surveyName, datePublished, timePublished, link) => {
    const surveyData = {
        User_Name: username,
        Survey_Name: surveyName,
        Date: datePublished,
        Time: timePublished,
        Qualtrix_link: link,
        Qualtrics_Survey_ID: surveyID,
        Result_file_path: '', // Update if any result file generated (Unnecessary currently)
        Hypothesis: '' // Update if hypothesis is needed (might have to changed to different fields depending on template)
    };

    try {
        await dbUtils.insertRow('survey', surveyData);
        console.log("Survey details inserted into the database");
    } catch (error) {
        throw new Error("Failed to insert survey details into the database");
    }
};


// Function to add new entry into UserSurvey table
const insertUserSurvey = async (username, surveyID) => {
    const userSurveyData = {
        User_Name: username,
        Survey_ID: surveyID
    };

    try {
        await dbUtils.insertRow('user_survey', userSurveyData);
        console.log("User-Survey relationship inserted into the database");
    } catch (error) {
        throw new Error("Failed to insert User-Survey relationship into the database");
    }
};


module.exports = { insertSurvey, insertUserSurvey }