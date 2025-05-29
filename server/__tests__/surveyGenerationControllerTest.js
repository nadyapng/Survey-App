// surveyController.test.js

const { publishSurvey, generateSurveyLink, addAllQuestions } = require('../routes/SurveyGeneration/surveyGenerationController');
const qualtricsController = require('../routes/Qualtrics/qualtricsController');
const dbHelper = require('../database/surveyGenerationFunctions');

jest.mock('../routes/Qualtrics/qualtricsController');
jest.mock('../database/surveyGenerationFunctions');
// Mocking necessary functions
jest.mock('../routes/Qualtrics/qualtricsController');
jest.mock('../database/surveyGenerationFunctions');

describe('Survey Integration Test', () => {

    describe('publishSurvey Integration', () => {

        // Test for successful survey creation and question addition
        test('should publish the survey and return the survey link', async () => {
            // Mocking necessary functions
            qualtricsController.createSurvey.mockResolvedValue('test-survey-id'); // Mock survey creation
            qualtricsController.createQuestion.mockResolvedValue(true); // Mock question creation
            qualtricsController.updateSurveyStatus.mockResolvedValue(true); // Mock survey activation
            qualtricsController.getAnonLink.mockResolvedValue('http://test-link.com'); // Mock link generation
            dbHelper.insertSurvey.mockResolvedValue(true); // Mock DB insert

            const mockReq = {
                body: {
                    username: 'testuser',
                    surveyName: 'Test Survey',
                    questions: [
                        { questionText: 'Q1', type: 'mcq', options: ['Option1', 'Option2'] },
                        { questionText: 'Q2', type: 'text' }
                    ]
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn()
            };

            await publishSurvey(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ link: 'http://test-link.com' });
            expect(dbHelper.insertSurvey).toHaveBeenCalledWith(
                'testuser',
                'test-survey-id',
                'Test Survey',
                expect.any(String),  // datePublished
                expect.any(String),  // timePublished
                'http://test-link.com'
            );
        });

        // Test for missing required fields (bad request)
        test('should return 400 if required fields are missing', async () => {
            const mockReq = { body: { surveyName: '', questions: [] } };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await publishSurvey(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith("Request needs username, surveyName, and questions fields");
        });

        // Test for failure during survey creation
        test('should return 500 if survey creation fails', async () => {
            qualtricsController.createSurvey.mockResolvedValue(null); // Mock survey creation failure

            const mockReq = {
                body: {
                    username: 'testuser',
                    surveyName: 'Test Survey',
                    questions: [
                        { questionText: 'Q1', type: 'mcq', options: ['Option1', 'Option2'] },
                        { questionText: 'Q2', type: 'text' }
                    ]
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await publishSurvey(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.send).toHaveBeenCalledWith("Failed to generate survey");
        });

        // Test for failure during question addition
        test('should return 500 if question addition fails', async () => {
            qualtricsController.createSurvey.mockResolvedValue('test-survey-id'); // Survey created successfully
            qualtricsController.createQuestion.mockResolvedValueOnce(true).mockResolvedValueOnce(false); // First question succeeds, second fails

            const mockReq = {
                body: {
                    username: 'testuser',
                    surveyName: 'Test Survey',
                    questions: [
                        { questionText: 'Q1', type: 'mcq', options: ['Option1', 'Option2'] },
                        { questionText: 'Q2', type: 'text' }
                    ]
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await publishSurvey(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.send).toHaveBeenCalledWith("Failed to add question 1 to survey");
        });
    });
});