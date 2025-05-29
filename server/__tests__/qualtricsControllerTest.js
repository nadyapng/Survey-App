const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const {
  createSurvey, createQuestion, getSurvey, getQuestion, updateSurveyStatus, getAnonLink,
  initiateResponseExport, checkExportProgress, downloadSurveyResponses, deleteSurvey, getAllSurveys, getSurveyDefinition
} = require('../routes/Qualtrics/qualtricsController');  // Import your module here

const mock = new MockAdapter(axios);
const dataCenter = 'au1';  // Mock data center if needed for your tests

describe("Qualtrics Service Tests", () => {

  const surveyId = "SV_12345";
  const questionId = "QID123";

  afterEach(() => {
    mock.reset();  // Reset mock after each test
  });

  // Test createSurvey function
  test('createSurvey should return a survey ID on success', async () => {
    const surveyName = 'Test Survey';
    const mockResponse = { result: { SurveyID: surveyId } };

    mock.onPost(/survey-definitions/).reply(200, mockResponse);

    const result = await createSurvey(surveyName);
    expect(result).toBe(surveyId);
  });

  // Test createSurvey error handling
  test('createSurvey should return null on failure', async () => {
    mock.onPost(/survey-definitions/).reply(500);

    const result = await createSurvey('Test Survey');
    expect(result).toBeNull();
  });

  // Test createQuestion function
  test('createQuestion should return a question on success', async () => {
    const mockResponse = { result: { QuestionID: questionId } };
    const question = { QuestionText: 'Sample Question' };

    mock.onPost(new RegExp(`/survey-definitions/${surveyId}/questions`)).reply(200, mockResponse);

    const result = await createQuestion(surveyId, question);
    expect(result.result.QuestionID).toBe(questionId);
  });

  // Test getSurvey function
  test('getSurvey should return survey data on success', async () => {
    const mockResponse = { result: { SurveyName: 'Test Survey' } };

    mock.onGet(new RegExp(`/survey-definitions/${surveyId}`)).reply(200, mockResponse);

    const result = await getSurvey(surveyId);
    expect(result.result.SurveyName).toBe('Test Survey');
  });

  // Test updateSurveyStatus function
  test('updateSurveyStatus should update the survey status', async () => {
    const mockResponse = { result: { SurveyStatus: 'Active' } };

    mock.onPut(new RegExp(`/survey-definitions/${surveyId}/metadata`)).reply(200, mockResponse);

    const result = await updateSurveyStatus(surveyId, true);
    expect(result.data.result.SurveyStatus).toBe('Active');
  });

  // Test getAnonLink function
  test('getAnonLink should return the correct anonymous link', () => {
    const anonLink = getAnonLink(surveyId);
    expect(anonLink).toBe(`${process.env.ANON_LINK_URL}${surveyId}`);
  });

  // Test deleteSurvey function
  test('deleteSurvey should delete the survey', async () => {
    mock.onDelete(new RegExp(`/survey-definitions/${surveyId}`)).reply(200, { result: 'Success' });

    await deleteSurvey(surveyId);
  });

  // Test getAllSurveys function

  // Test getAllSurveys error handling
  test('getAllSurveys should return a 500 error when request fails', async () => {
    mock.onGet(new RegExp(`https://${dataCenter}.qualtrics.com/API/v3/surveys`)).reply(500);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getAllSurveys(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching surveys' });
  });

  // Test getSurveyDefinition function
  test('getSurveyDefinition should fetch the survey definition successfully', async () => {
    const mockResponse = { result: { SurveyID: surveyId, name: 'Mock Survey' } };

    mock.onGet(new RegExp(`https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyId}`)).reply(200, mockResponse);

    const req = { query: { surveyId: surveyId } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getSurveyDefinition(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResponse.result);
  });

  // Test getSurveyDefinition error handling
  test('getSurveyDefinition should return a 500 error when request fails', async () => {
    mock.onGet(new RegExp(`https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyId}`)).reply(500);

    const req = { query: { surveyId: surveyId } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getSurveyDefinition(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching survey definition' });
  });

  // Test downloadSurveyResponses function
// test('downloadSurveyResponses should download survey responses successfully', async () => {
//   const fileId = "file123";
//   const surveyId = "SV_12345";
//   const mockResponse = { data: { response: 'Survey Responses Data' } };

//   mock.onGet(new RegExp(`/surveys/${surveyId}/export-responses/${fileId}/file`)).reply(200, mockResponse);

//   const req = { query: { fileId: fileId, surveyId: surveyId } };
//   const res = {
//     json: jest.fn(),
//     status: jest.fn().mockReturnThis(),
//   };

//   await downloadSurveyResponses(req, res);

//   // Check that the response contains the survey responses
//   expect(res.json).toHaveBeenCalledWith(mockResponse.data);
// });

// Test downloadSurveyResponses error handling
test('downloadSurveyResponses should return a 500 error when request fails', async () => {
  const fileId = "file123";
  const surveyId = "SV_12345";

  mock.onGet(new RegExp(`/surveys/${surveyId}/export-responses/${fileId}/file`)).reply(500);

  const req = { query: { fileId: fileId, surveyId: surveyId } };
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  await downloadSurveyResponses(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ message: 'Error downloading survey responses' });
});

});
