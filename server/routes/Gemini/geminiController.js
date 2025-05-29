// Setup and configure google gemini
const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const path = require("path");

const mcqFormat = require('../../data/mcq_format.js');
const sliderFormat = require('../../data/slider_format.js')
const matrixFormat = require('../../data/matrix_format.js')

// Generate content based on given prompt
const generateContent = async (prompt)=>{
    // DEBUG
    console.log("PROMPT", prompt)
    try{
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        // res.send(text);
        console.log("\n\nOUTPUT", text)
        return text
    }
    catch(err){
        console.log(err);
        // res.send("Unexpected Error!!!");
        return null
    }
}

// // Generate content based on given request 
// // For debug purposes (so we can give a custom manual typed prompt and check)
// const generateContentCustom = async (req, res)=>{
//     // DEBUG STUFF (CHANGE PROMPTS HERE FOR CUSTOM PROMPT INPUT INTO GEMINI)
//     prompt = `I am creating a survey for my research. My research topic is: The Relationship between sleep and productivity. 
//     Here is extra context about the research topic: This research is aimed at university students
//     Help me generate one text input question for my research survey.
//     Format them in a json format like this: {questionText: ,questionType: ,questionDescription: , ...}
//     Here is a list of existing survey questions. Do not repeat these questions or generate similar questions: Do you feel you are generally more or less productive when you get better sleep?`

//     prompt1 = `This is my question:
//     {
// "questionText": "Please rate the impact of remote work on your productivity in different aspects.",
// "questionType": "matrix",
// "questionDescription": "This question asks you to assess the impact of remote work on various aspects of your
// productivity.",
// "rows": [
// { "value": "Working hours", "label": "Working Hours" },
// { "value": "Task completion", "label": "Task Completion" },
// { "value": "Communication with colleagues", "label": "Communication with Colleagues" },
// { "value": "Stress levels", "label": "Stress Levels" },
// { "value": "Work-life balance", "label": "Work-Life Balance" }
// ],
// "columns": [
// { "value": "Negative", "label": "Negative Impact" },
// { "value": "Neutral", "label": "No Impact" },
// { "value": "Positive", "label": "Positive Impact" }
// ]
// }
// }

// Can you reformat this into the format given below? Follow the following format exactly, and there should only be once choice as there is only one slider in the question:
// ${matrixFormat}
// `
//     try{
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = response.text();
//         res.send(text);
//         return text
//     }
//     catch(err){
//         console.log(err);
//         res.send("Unexpected Error!!!");
//         return null
//     }
// }

module.exports = { generateContent, model };