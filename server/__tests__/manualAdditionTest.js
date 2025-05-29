const { getMcqDefault, getMatrixDefault, getSliderDefault, getTextDefault, getDescriptiveDefault } = require('../routes/ManualAddition/manualAdditionController');

// Mock the required data formats
jest.mock('../data/mcq_format.js', () => ({
    mcqDefault: { type: 'MCQ', question: 'Sample MCQ Question' }
}));
jest.mock('../data/matrix_format.js', () => ({
    matrixDefault: { type: 'Matrix', question: 'Sample Matrix Question' }
}));
jest.mock('../data/slider_format.js', () => ({
    sliderDefault: { type: 'Slider', question: 'Sample Slider Question' }
}));
jest.mock('../data/textInput_format.js', () => ({
    textDefault: { type: 'Text', question: 'Sample Text Input Question' }
}));
jest.mock('../data/descriptive_format.js', () => ({
    descriptiveDefault: { type: 'Descriptive', question: 'Sample Descriptive Question' }
}));

// Helper function to mock req and res
const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Template Defaults Handlers', () => {

    it('should return the default MCQ template', () => {
        const req = {}; // Mock request object (empty)
        const res = mockResponse(); // Mock response object

        getMcqDefault(req, res);

        // Verify the correct response was sent
        expect(res.json).toHaveBeenCalledWith({ type: 'MCQ', question: 'Sample MCQ Question' });
    });

    it('should return the default matrix template', () => {
        const req = {};
        const res = mockResponse();

        getMatrixDefault(req, res);

        // Verify the correct response was sent
        expect(res.json).toHaveBeenCalledWith({ type: 'Matrix', question: 'Sample Matrix Question' });
    });

    it('should return the default slider template', () => {
        const req = {};
        const res = mockResponse();

        getSliderDefault(req, res);

        // Verify the correct response was sent
        expect(res.json).toHaveBeenCalledWith({ type: 'Slider', question: 'Sample Slider Question' });
    });

    it('should return the default text-input template', () => {
        const req = {};
        const res = mockResponse();

        getTextDefault(req, res);

        // Verify the correct response was sent
        expect(res.json).toHaveBeenCalledWith({ type: 'Text', question: 'Sample Text Input Question' });
    });

    it('should return the default descriptive template', () => {
        const req = {};
        const res = mockResponse();

        getDescriptiveDefault(req, res);

        // Verify the correct response was sent
        expect(res.json).toHaveBeenCalledWith({ type: 'Descriptive', question: 'Sample Descriptive Question' });
    });
});
