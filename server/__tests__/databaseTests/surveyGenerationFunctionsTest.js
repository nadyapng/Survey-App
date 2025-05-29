const { insertSurvey, insertUserSurvey } = require('../../database/surveyGenerationFunctions');
const dbUtils = require('../../dbtools/dbUtils');

// Mock the dbUtils.insertRow function
jest.mock('../../dbtools/dbUtils');

describe('Database Insert Functions', () => {

    describe('insertSurvey', () => {
        it('should insert survey details into the database successfully', async () => {
            // Mock the insertRow function to resolve successfully
            dbUtils.insertRow.mockResolvedValueOnce();

            const username = 'testUser';
            const surveyID = '123';
            const surveyName = 'Test Survey';
            const datePublished = '2023-10-10';
            const timePublished = '10:00:00';
            const link = 'http://example.com';

            await insertSurvey(username, surveyID, surveyName, datePublished, timePublished, link);

            // Check if insertRow was called with correct parameters
            expect(dbUtils.insertRow).toHaveBeenCalledWith('survey', {
                User_Name: username,
                Survey_Name: surveyName,
                Date: datePublished,
                Time: timePublished,
                Qualtrix_link: link,
                Qualtrics_Survey_ID: surveyID,
                Result_file_path: '',
                Hypothesis: ''
            });
        });

        it('should throw an error if inserting survey details fails', async () => {
            // Mock the insertRow function to throw an error
            dbUtils.insertRow.mockRejectedValueOnce(new Error('Database Error'));

            const username = 'testUser';
            const surveyID = '123';
            const surveyName = 'Test Survey';
            const datePublished = '2023-10-10';
            const timePublished = '10:00:00';
            const link = 'http://example.com';

            await expect(insertSurvey(username, surveyID, surveyName, datePublished, timePublished, link))
                .rejects
                .toThrow('Failed to insert survey details into the database');

            // Check if insertRow was called with correct parameters
            expect(dbUtils.insertRow).toHaveBeenCalledWith('survey', {
                User_Name: username,
                Survey_Name: surveyName,
                Date: datePublished,
                Time: timePublished,
                Qualtrix_link: link,
                Qualtrics_Survey_ID: surveyID,
                Result_file_path: '',
                Hypothesis: ''
            });
        });
    });

    describe('insertUserSurvey', () => {
        it('should insert User-Survey relationship into the database successfully', async () => {
            // Mock the insertRow function to resolve successfully
            dbUtils.insertRow.mockResolvedValueOnce();

            const username = 'testUser';
            const surveyID = '123';

            await insertUserSurvey(username, surveyID);

            // Check if insertRow was called with correct parameters
            expect(dbUtils.insertRow).toHaveBeenCalledWith('user_survey', {
                User_Name: username,
                Survey_ID: surveyID
            });
        });

        it('should throw an error if inserting User-Survey relationship fails', async () => {
            // Mock the insertRow function to throw an error
            dbUtils.insertRow.mockRejectedValueOnce(new Error('Database Error'));

            const username = 'testUser';
            const surveyID = '123';

            await expect(insertUserSurvey(username, surveyID))
                .rejects
                .toThrow('Failed to insert User-Survey relationship into the database');

            // Check if insertRow was called with correct parameters
            expect(dbUtils.insertRow).toHaveBeenCalledWith('user_survey', {
                User_Name: username,
                Survey_ID: surveyID
            });
        });
    });

});
