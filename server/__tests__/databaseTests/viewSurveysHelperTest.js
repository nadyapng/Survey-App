const { getSurveysByUsername, deleteSurvey } = require('../../database/viewSurveysHelper');
const dbUtils = require('../../dbtools/dbUtils');

// Mock the dbUtils functions
jest.mock('../../dbtools/dbUtils');

describe('Survey Database Functions', () => {

    describe('getSurveysByUsername', () => {
        it('should retrieve surveys for a given username', async () => {
            // Mock data returned by dbUtils.executeQuery
            const mockSurveys = [
                {
                    Survey_ID: '1',
                    Survey_Name: 'Test Survey 1',
                    Date: '2023-10-01',
                    Time: '12:00:00',
                    Qualtrix_link: 'http://example.com/survey1',
                    Qualtrics_Survey_ID: '123'
                },
                {
                    Survey_ID: '2',
                    Survey_Name: 'Test Survey 2',
                    Date: '2023-10-02',
                    Time: '14:00:00',
                    Qualtrix_link: 'http://example.com/survey2',
                    Qualtrics_Survey_ID: '456'
                }
            ];

            // Mock the executeQuery function to resolve successfully with mockSurveys
            dbUtils.executeQuery.mockResolvedValueOnce(mockSurveys);

            const username = 'testUser';
            const surveys = await getSurveysByUsername(username);

            // // Check if executeQuery was called with the correct query and parameters
            // expect(dbUtils.executeQuery).toHaveBeenCalledWith(`
            //     SELECT Survey_ID, Survey_Name, Date, Time, Qualtrix_link, Qualtrics_Survey_ID 
            //     FROM Survey 
            //     WHERE User_Name = ?;
            // `, [username]);

            // Check that the correct surveys were returned
            expect(surveys).toEqual(mockSurveys);
        });

        it('should throw an error if fetching surveys fails', async () => {
            // Mock the executeQuery function to throw an error
            dbUtils.executeQuery.mockRejectedValueOnce(new Error('Database Error'));

            const username = 'testUser';

            await expect(getSurveysByUsername(username)).rejects.toThrow('Database Error');

            // // Check if executeQuery was called with the correct query and parameters
            // expect(dbUtils.executeQuery).toHaveBeenCalledWith(`
            //     SELECT Survey_ID, Survey_Name, Date, Time, Qualtrix_link, Qualtrics_Survey_ID 
            //     FROM Survey 
            //     WHERE User_Name = ?;
            // `, [username]);
        });
    });

    describe('deleteSurvey', () => {
        it('should delete a survey by surveyId', async () => {
            // Mock the deleteRow function to resolve successfully
            dbUtils.deleteRow.mockResolvedValueOnce({ affectedRows: 1 });

            const surveyId = '123';
            const result = await deleteSurvey(surveyId);

            // Check if deleteRow was called with correct parameters
            expect(dbUtils.deleteRow).toHaveBeenCalledWith('Survey', 'Qualtrics_Survey_ID', surveyId);

            // Check that the result is as expected
            expect(result).toEqual({ affectedRows: 1 });
        });

        it('should throw an error if deleting a survey fails', async () => {
            // Mock the deleteRow function to throw an error
            dbUtils.deleteRow.mockRejectedValueOnce(new Error('Database Error'));

            const surveyId = '123';

            await expect(deleteSurvey(surveyId)).rejects.toThrow('Database Error');

            // Check if deleteRow was called with correct parameters
            expect(dbUtils.deleteRow).toHaveBeenCalledWith('Survey', 'Qualtrics_Survey_ID', surveyId);
        });
    });

});
