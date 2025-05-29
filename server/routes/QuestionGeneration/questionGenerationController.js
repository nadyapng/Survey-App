const geminiController = require('../Gemini/geminiController');

// Import question formats
const mcqFormat = require('../../data/mcq_format.js');
const matrixFormat = require('../../data/matrix_format.js');
const sliderFormat = require('../../data/slider_format.js');
const textFormat = require('../../data/textInput_format.js');
const descriptiveFormat = require('../../data/descriptive_format.js');
const path = require("path");

// HELPER FUNCTIONS

// Generate prompt to get question with simplified json (improves quality of questions and prevents duplication)
const generateQuestionPrompt = (researchQuestion, context, simpleFormat, questionType, existingStr) => {
    // TODO check prompt length and make sure it is within limits
    return `I am creating a survey for my research. My research topic is: ${researchQuestion}. 
    Here is extra context about the research topic: ${context}
    Help me generate one ${questionType} question for my research survey.
    Format the question in a json format like this: ${simpleFormat}
    Here is a list of existing survey questions. Do not repeat these questions or generate similar questions: ${existingStr}`
}


// Generate prompt to format previously generated question into Qualtrics format
const generateFormatPrompt = (question, qualtricsFormat) => {
    return `This is my question:
    ${question}
Can you reformat this into the format given below? Follow the following format exactly:
${qualtricsFormat}
`
}

// Format existing question list into string helper function
const formatExistingList = (existing) => {
    // Handle empty list
    if (existing.length === 0) {
        return "None"
    }
    // Map over the existing array to extract 'questionText' and join them into a single string
    return existing.map(item => item.questionText).join(', ');
}

// helper function to extract JSON from output
const extractJSON = (text) => {
    // Regular expression to match the JSON content between ```json and ```
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    
    if (jsonMatch && jsonMatch[1]) {
        const jsonString = jsonMatch[1].trim(); // extract the JSON string
        try {
            return JSON.parse(jsonString); // parse the JSON string to an object
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return null;
        }
    } else {
        console.error("JSON format not found in the text.");
        return null;
    }
}


// Generate one SIMPLIFIED question of specific question type
const generateSimplified = async (researchQuestion, context, simpleFormat, questionType, existing) => {
    // format list of existing questions into string
    const existingStr = formatExistingList(existing)
    const prompt = generateQuestionPrompt(researchQuestion, context, simpleFormat, questionType, existingStr);
    // DEBUG
    // console.log(prompt)

    try {
        // Use geminiController to generate the content
        const text = await geminiController.generateContent(prompt);
        
        if (text) {
            // Extract JSON from the text
            const jsonData = extractJSON(text);
            
            if (jsonData) {
                // Return question in simplified json format
                return jsonData
            } else {
                console.log("Failed to parse JSON")
                return null
            }
        } else {
            console.log("Failed to generate content")
            return null
        }
    } catch (err) {
        console.error(err);
        console.log("An error occured when generating questions")
    }
}


// Input simplified question to Gemini to get FORMATTED question (in Qualtrics format)
const generateFormatted = async (question, qualtricsFormat) => {
    // Generate prompt for specific question
    const prompt = generateFormatPrompt(question, qualtricsFormat)

    // DEBUG
    // console.log(prompt)

    try {
        // Use geminiController to generate the content
        const text = await geminiController.generateContent(prompt);
        
        if (text) {
            // Extract JSON from the text
            const jsonData = extractJSON(text);
            
            if (jsonData) {
                // Return question in Qualtrics json format
                return jsonData
            } else {
                console.log("Failed to parse JSON")
                return null
            }
        } else {
            console.log("Failed to generate content")
            return null
        }
    } catch (err) {
        console.error(err);
        console.log("An error occured when generating questions")
    }
}


// Generate one Qualtrics formatted question
const generateQuestion = async(researchQuestion, context, simpleFormat, questionType, existing, qualtricsFormat) => {
    // Generate simplified question
    const simplifiedQuestion = await generateSimplified(researchQuestion, context, simpleFormat, questionType, existing)

    // Format question into Qualtrics format and return
    return await generateFormatted(JSON.stringify(simplifiedQuestion), qualtricsFormat)
}


// MAIN FUNCTIONS

// GENERAL FUNCTION FOR ALL QUESTION TYPES
// Full process of question generation (handles request, generating simplified, generating formatted, sending response)
const generateResponse = async(req, res, simpleFormat, questionType, qualtricsFormat) => {
    // Check for missing fields 
    if (!req.body.researchQuestion || !req.body.existing || !req.body.context) {
        res.status(400).send('Request body must contain researchQuestion, existing, content')
    }
    
    // Extract researchQuestion and context from request
    const researchQuestion = req.body.researchQuestion;

    // Get current questions to prevent duplicates 
    // Should it be list of current questions (undeleted) on webapp
    const existing = req.body.existing // list of json objects {QuestionText} 

    // get context from request
    const context = req.body.context;

    // Call Gemini to generate question
    const jsonData = await generateQuestion(researchQuestion, context, simpleFormat, questionType, existing, qualtricsFormat)
    if (jsonData) {
        res.json(jsonData);
    } else {
        console.error(`Failed to generate ${questionType} question.`);
        res.status(500).send(`Failed to generate ${questionType} question.`);
    }
}

// Create prompt, generate one MCQ and send response
const generateMCQ = async(req, res) => {
    generateResponse(req, res, mcqFormat.mcqSimple, "MCQ", mcqFormat.mcqQualtrics)
}

// Create prompt, generate one matrix question and send response
const generateMatrixQ = async(req, res) => {
    generateResponse(req, res, matrixFormat.matrixSimplified, "MATRIX", matrixFormat.matrixQualtrics)
}


// Create prompt, generate one text input question and send response
const generateTextQ = async(req, res) => {
    generateResponse(req, res, textFormat.textQualtrics, "TEXT INPUT", textFormat.textQualtrics)
}


// Create prompt, generate one slider question and send response
const generateSliderQ = async(req, res) => {
    generateResponse(req, res, sliderFormat.sliderSimple, "SLIDER", sliderFormat.sliderQualtrics)
}


// Create prompt, generate one descriptive text question and send response
const generateDescriptiveQ = async(req, res) => {
    generateResponse(req, res, descriptiveFormat.descriptiveSimplified, "DESCRIPTIVE TEXT INPUT", descriptiveFormat.descriptiveQualtrics)
}

// Export functions
module.exports = { generateMCQ, generateMatrixQ, generateSliderQ, generateTextQ, generateDescriptiveQ, generateQuestionPrompt, generateFormatPrompt, formatExistingList, extractJSON, generateSimplified, generateFormatted, generateResponse };