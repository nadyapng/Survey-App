// Import the module to be tested
const {
    generateQuestionPrompt,
    generateFormatPrompt,
    formatExistingList,
    extractJSON,
    generateSimplified,
    generateFormatted,
    generateMCQ,
    generateMatrixQ,
    generateTextQ,
    generateSliderQ,
    generateDescriptiveQ,
    generateResponse
} = require('../routes/QuestionGeneration/questionGenerationController');
const geminiController = require('../routes/Gemini/geminiController');

// Mock the geminiController for external API calls
jest.mock('../routes/Gemini/geminiController');

describe('Helper Functions Tests', () => {

    // Test for generateQuestionPrompt
    describe('generateQuestionPrompt', () => {
        it('should generate the correct prompt based on input parameters', () => {
            const researchQuestion = "How does AI impact employment?";
            const context = "The impact of AI on jobs and job displacement.";
            const simpleFormat = "{ questionText: 'Sample Question', questionType: 'MCQ' }";
            const questionType = "MCQ";
            const existingStr = "Sample Question 1, Sample Question 2";

            const result = generateQuestionPrompt(researchQuestion, context, simpleFormat, questionType, existingStr);

            expect(result).toContain(researchQuestion);
            expect(result).toContain(context);
            expect(result).toContain(simpleFormat);
            expect(result).toContain(questionType);
            expect(result).toContain(existingStr);
        });
    });

    // Test for generateFormatPrompt
    describe('generateFormatPrompt', () => {
        it('should generate the correct format prompt for a question', () => {
            const question = "{ questionText: 'What is AI?' }";
            const qualtricsFormat = "{ questionText: 'Qualtrics formatted question' }";

            const result = generateFormatPrompt(question, qualtricsFormat);

            expect(result).toContain(question);
            expect(result).toContain(qualtricsFormat);
        });
    });

    // Test for formatExistingList
    describe('formatExistingList', () => {
        it('should return "None" if the list is empty', () => {
            const existing = [];
            const result = formatExistingList(existing);
            expect(result).toBe("None");
        });

        it('should return a comma-separated list of question texts', () => {
            const existing = [{ questionText: 'Question 1' }, { questionText: 'Question 2' }];
            const result = formatExistingList(existing);
            expect(result).toBe('Question 1, Question 2');
        });
    });

    // Test for extractJSON
    describe('extractJSON', () => {
        it('should extract JSON object from text with JSON block', () => {
            const text = "```json\n{\"questionText\": \"What is AI?\"}\n```";
            const result = extractJSON(text);
            expect(result).toEqual({ questionText: "What is AI?" });
        });

        it('should return null if no JSON block is found', () => {
            const text = "This is a text without JSON.";
            const result = extractJSON(text);
            expect(result).toBeNull();
        });

        it('should return null if JSON parsing fails', () => {
            const text = "```json\n{invalid json}\n```";
            const result = extractJSON(text);
            expect(result).toBeNull();
        });
    });

    // Test for generateSimplified
    describe('generateSimplified', () => {
        it('should return simplified question in JSON format', async () => {
            const researchQuestion = "How does AI impact employment?";
            const context = "The impact of AI on jobs and job displacement.";
            const simpleFormat = "{ questionText: 'Sample Question', questionType: 'MCQ' }";
            const questionType = "MCQ";
            const existing = [{ questionText: 'Existing Question' }];
            
            const mockGeneratedContent = "```json\n{\"questionText\": \"How does AI impact jobs?\"}\n```";
            geminiController.generateContent.mockResolvedValue(mockGeneratedContent);

            const result = await generateSimplified(researchQuestion, context, simpleFormat, questionType, existing);
            expect(result).toEqual({ questionText: "How does AI impact jobs?" });
        });

        it('should return null if no content is generated', async () => {
            geminiController.generateContent.mockResolvedValue(null);
            const result = await generateSimplified("question", "context", "format", "type", []);
            expect(result).toBeNull();
        });

        it('should return null if JSON extraction fails', async () => {
            geminiController.generateContent.mockResolvedValue("Invalid JSON format");
            const result = await generateSimplified("question", "context", "format", "type", []);
            expect(result).toBeNull();
        });
    });

    // Test for generateFormatted
    describe('generateFormatted', () => {
        it('should return formatted question in JSON format', async () => {
            const question = "{ questionText: 'How does AI impact jobs?' }";
            const qualtricsFormat = "{ questionText: 'Formatted question' }";

            const mockGeneratedContent = "```json\n{\"questionText\": \"Formatted AI question\"}\n```";
            geminiController.generateContent.mockResolvedValue(mockGeneratedContent);

            const result = await generateFormatted(question, qualtricsFormat);
            expect(result).toEqual({ questionText: "Formatted AI question" });
        });

        it('should return null if no content is generated', async () => {
            geminiController.generateContent.mockResolvedValue(null);
            const result = await generateFormatted("question", "format");
            expect(result).toBeNull();
        });

        it('should return null if JSON extraction fails', async () => {
            geminiController.generateContent.mockResolvedValue("Invalid JSON format");
            const result = await generateFormatted("question", "format");
            expect(result).toBeNull();
        });
    });
});

// Main Function Tests
describe('Main Function Tests', () => {

    describe('generateResponse', () => {
        it('should send a generated question as a response', async () => {
            const req = {
                body: {
                    researchQuestion: "What is AI?",
                    context: "AI in different industries",
                    existing: [{ questionText: "Existing Question" }]
                }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            const mockGeneratedQuestion = { questionText: "What is AI's role in automation?" };
            geminiController.generateContent.mockResolvedValue("```json\n{\"questionText\": \"What is AI's role in automation?\"}\n```");

            await generateResponse(req, res, "{ questionText: 'MCQ' }", "MCQ", "{ questionText: 'Qualtrics format' }");

            expect(res.json).toHaveBeenCalledWith(mockGeneratedQuestion);
        });

        it('should send a 500 error if question generation fails', async () => {
            const req = {
                body: {
                    researchQuestion: "What is AI?",
                    context: "AI in different industries",
                    existing: [{ questionText: "Existing Question" }]
                }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            geminiController.generateContent.mockResolvedValue(null);

            await generateResponse(req, res, "{ questionText: 'MCQ' }", "MCQ", "{ questionText: 'Qualtrics format' }");

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith("Failed to generate MCQ question.");
        });
    });

    describe('generateMCQ', () => {
        it('should call generateResponse with MCQ format', async () => {
            const req = { body: { researchQuestion: "Sample Question", existing: [], context: "" } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

            await generateMCQ(req, res);

            expect(geminiController.generateContent).toHaveBeenCalled();
        });
    });

    describe('generateMatrixQ', () => {
        it('should call generateResponse with Matrix format', async () => {
            const req = { body: { researchQuestion: "Sample Matrix Question", existing: [], context: "" } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

            await generateMatrixQ(req, res);

            expect(geminiController.generateContent).toHaveBeenCalled();
        });
    });

    describe('generateTextQ', () => {
        it('should call generateResponse with Text Input format', async () => {
            const req = { body: { researchQuestion: "Sample Text Input Question", existing: [], context: "" } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

            await generateTextQ(req, res);

            expect(geminiController.generateContent).toHaveBeenCalled();
        });
    });

    describe('generateSliderQ', () => {
        it('should call generateResponse with Slider format', async () => {
            const req = { body: { researchQuestion: "Sample Slider Question", existing: [], context: "" } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

            await generateSliderQ(req, res);

            expect(geminiController.generateContent).toHaveBeenCalled();
        });
    });

    describe('generateDescriptiveQ', () => {
        it('should call generateResponse with Descriptive format', async () => {
            const req = { body: { researchQuestion: "Sample Descriptive Question", existing: [], context: "" } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

            await generateDescriptiveQ(req, res);

            expect(geminiController.generateContent).toHaveBeenCalled();
        });
    });
});