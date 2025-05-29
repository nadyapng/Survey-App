/*
    This file contains the payloads for the different question types.
    Has no actual functionality, just a reference for the payloads.
*/


// MCQ
const mcqPayload = {
    questionType: "mc",
    questionDescription: "",
    questionText: "",
    ChoiceOrder: [],
    choices: {}
}

// Matrix
const matrixPayload = {
    questionType: "matrix",
    questionDescription: "",
    questionText: "",
    ChoiceOrder: [],
    AnswerOrder: [],
    Choices: {},
    Answers: {}
}

// Text Entry
const textEntryPayload = {
    questionType: "te",
    questionDescription: "",
    questionText: ""
}

// Slider
const sliderPayload = {
    questionType: "slider",
    questionDescription: "",
    questionText: "",
    min: 0,
    max: 100,
    step: 1
}

// Descriptive
const descriptivePayload = {
    questionType: "db",
    questionDescription: "",
    questionText: ""
}