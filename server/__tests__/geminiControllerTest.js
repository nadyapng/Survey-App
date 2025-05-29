const { generateContent, model } = require('../routes/Gemini/geminiController');

// Mock the external model.generateContent function
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn(() => {
          return {
            generateContent: jest.fn().mockImplementation(() => {
              return Promise.resolve({
                response: {
                  text: jest.fn().mockResolvedValue('Generated survey question JSON format')
                }
              });
            })
          };
        })
      };
    })
  };
});

describe('Google Gemini API - Content Generation', () => {
  
  // Test generateContent function
  describe('generateContent', () => {
    test('should return generated content based on a valid prompt', async () => {
      const prompt = 'Generate a question about sleep and productivity';
      
      const result = await generateContent(prompt);
      
      expect(result).toEqual('Generated survey question JSON format');
    });

    test('should return null when there is an error', async () => {
      // Mock error case
      model.generateContent.mockRejectedValueOnce(new Error('API Error'));
      
      const prompt = 'Invalid prompt';
      const result = await generateContent(prompt);
      
      expect(result).toBeNull();
    });
  });

//   // Test generateContentCustom function
//   describe('generateContentCustom', () => {
//     let req, res;

//     beforeEach(() => {
//       req = {};
//       res = { send: jest.fn() };
//     });

//     test('should return custom generated content', async () => {
//       await generateContentCustom(req, res);
      
//       expect(res.send).toHaveBeenCalledWith('Generated survey question JSON format');
//     });

//     test('should return error message on failure', async () => {
//       // Mock the model to throw an error
//       model.generateContent.mockRejectedValueOnce(new Error('API Error'));
      
//       await generateContentCustom(req, res);
      
//       expect(res.send).toHaveBeenCalledWith("Unexpected Error!!!");
//     });
//   });

});