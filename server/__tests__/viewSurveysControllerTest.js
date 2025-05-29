// surveyController.test.js

const viewSurveysHelper = require('../database/viewSurveysHelper');
const qualtricsController = require('../routes/Qualtrics/qualtricsController');
const { getSurveysByUsername, toggleStatus, deleteSurvey } = require('../routes/ViewSurveys/viewSurveysController'); // Update with the actual path

jest.mock('../database/viewSurveysHelper');
jest.mock('../routes/Qualtrics/qualtricsController');

describe('Survey Controller Tests', () => {
    describe('getSurveysByUsername', () => {
        let req, res;

        beforeEach(() => {
            req = { params: { username: 'testUser' } };
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn(),
            };
        });

        it('should return surveys for the given username', async () => {
            const surveys = [
                { Qualtrics_Survey_ID: '1', name: 'Survey 1' },
                { Qualtrics_Survey_ID: '2', name: 'Survey 2' },
            ];
            const surveyDetails = {
                result: { SurveyStatus: 'Active' },
            };

            viewSurveysHelper.getSurveysByUsername.mockResolvedValue(surveys);
            qualtricsController.getSurvey.mockResolvedValue(surveyDetails);

            await getSurveysByUsername(req, res);

            expect(viewSurveysHelper.getSurveysByUsername).toHaveBeenCalledWith('testUser');
            expect(qualtricsController.getSurvey).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { ...surveys[0], SurveyStatus: 'Active' },
                { ...surveys[1], SurveyStatus: 'Active' },
            ]);
        });

        it('should return 404 if no surveys are found for the username', async () => {
            viewSurveysHelper.getSurveysByUsername.mockResolvedValue([]);

            await getSurveysByUsername(req, res);

            expect(viewSurveysHelper.getSurveysByUsername).toHaveBeenCalledWith('testUser');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('No surveys found for this user');
        });

        it('should return 500 if there is an error fetching surveys', async () => {
            viewSurveysHelper.getSurveysByUsername.mockRejectedValue(new Error('Database error'));

            await getSurveysByUsername(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Error fetching surveys');
        });
    });

    describe('toggleStatus', () => {
        let req, res;

        beforeEach(() => {
            req = {
                body: {
                    surveyId: '123',
                    activate: true,
                },
            };
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
        });

        it('should activate a survey and return success message', async () => {
            qualtricsController.updateSurveyStatus.mockResolvedValue({ status: 200 });

            await toggleStatus(req, res);

            expect(qualtricsController.updateSurveyStatus).toHaveBeenCalledWith('123', true);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Survey has been successfully activated.');
        });

        it('should deactivate a survey and return success message', async () => {
            req.body.activate = false; // Change to deactivate
            qualtricsController.updateSurveyStatus.mockResolvedValue({ status: 200 });

            await toggleStatus(req, res);

            expect(qualtricsController.updateSurveyStatus).toHaveBeenCalledWith('123', false);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Survey has been successfully deactivated.');
        });

        it('should return 400 if surveyId or activate flag is missing', async () => {
            req.body = {}; // Missing surveyId and activate

            await toggleStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Invalid request. Missing surveyId or activate flag.');
        });

        it('should return 500 if there is an error updating the survey status', async () => {
            qualtricsController.updateSurveyStatus.mockRejectedValue(new Error('API error'));

            await toggleStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('An error occurred while updating the survey status.');
        });
    });

    describe('deleteSurvey', () => {
        let req, res;

        beforeEach(() => {
            req = { params: { surveyId: '123' } };
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
        });

        it('should delete the survey from both Qualtrics and the database', async () => {
            qualtricsController.deleteSurvey.mockResolvedValue({ success: true });
            viewSurveysHelper.deleteSurvey.mockResolvedValue({ affectedRows: 1 });

            await deleteSurvey(req, res);

            expect(qualtricsController.deleteSurvey).toHaveBeenCalledWith('123');
            expect(viewSurveysHelper.deleteSurvey).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Survey with ID 123 deleted successfully from both Qualtrics and the database.',
                qualtricsStatus: { success: true },
            });
        });

        it('should return 404 if the survey is not found in the database', async () => {
            qualtricsController.deleteSurvey.mockResolvedValue({ success: true });
            viewSurveysHelper.deleteSurvey.mockResolvedValue({ affectedRows: 0 });

            await deleteSurvey(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({
                message: 'No survey found with ID 123 in the database.',
            });
        });

        it('should return 500 if there is an error deleting from Qualtrics', async () => {
            qualtricsController.deleteSurvey.mockRejectedValue(new Error('Qualtrics error'));

            await deleteSurvey(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: 'An error occurred while deleting the survey from Qualtrics.',
                error: 'Qualtrics error',
            });
        });

        it('should return 500 if there is an error deleting from the database', async () => {
            qualtricsController.deleteSurvey.mockResolvedValue({ success: true });
            viewSurveysHelper.deleteSurvey.mockRejectedValue(new Error('Database error'));

            await deleteSurvey(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Survey deleted from Qualtrics, but an error occurred while deleting it from the database.',
                error: 'Database error',
            });
        });
    });
});
