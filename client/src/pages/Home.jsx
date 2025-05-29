import { useEffect, useState } from "react";
import React from "react";
import axios from 'axios'
import '../App.css'
import './Home.css'
import QuestionDisplay from '../components/QuestionDisplay'
import FormComponent from "../components/QuestionGeneration/FormComponent";

import { TailSpin } from 'react-loader-spinner';
import QuestionSection from "../components/QuestionGeneration/QuestionSection";

import { useAuth } from "../context/AuthContext";

const Home = () => {

    const [message, setMessage] = useState('')
    const [researchQuestion, setResearchQuestion] = useState('')
    const [contextValue, setContextValue] = useState('')
    const [questions, setQuestions] = useState([]) // stores the entire JSON objects of questions that have been generated/created
    const [existingQuestionText, setExistingQuestionText] = useState([]) // stores the existing questionTexts that have been generated/created
    const [loading, setLoading] = useState(false);
    const [nextQuestionID, setNextQuestionID] = useState(1)

    const [showQuestionSection, setShowQuestionSection] = useState(false) // determines whether to show the question section
    const [showGenerateButtons, setShowGenerateButtons] = useState(true) // determines whether to show the buttons for the question types
    const [questionType, setQuestionType] = useState('') // stores the type of question that is being generated
    const [generatedQuestion, setGeneratedQuestion] = useState(null) // stores the generated question

    // stuff for manual question creation
    const [showManualQuestionForm, setShowManualQuestionForm] = useState(false) // determines whether to show the manual question creation form
    const [manualQuestion, setManualQuestion] = useState(null) // stores the manual question
    const [manualQuestionType, setManualQuestionType] = useState('') // stores the type of manual question that is being created
    const [isManualQuestion, setIsManualQuestion] = useState(false) // determines whether to show the manual question creation form

    const [formData, setFormData] = useState(null) // stores the form data for the question

    const {username} = useAuth() // get the username from the AuthContext
    const [surveyLink, setSurveyLink] = useState('');

    const [hypothesis, setHypothesis] = useState('');
    const [researchContext, setResearchContext] = useState('');
    const [researchObjectives, setResearchObjectives] = useState('');
    const [existingKnowledge, setExistingKnowledge] = useState('');
    const [keyVariables, setKeyVariables] = useState('');
    const [demographicInfo, setDemographicInfo] = useState('');
    const [topicsToExclude, setTopicsToExclude] = useState('');
    const [expectedOutcomes, setExpectedOutcomes] = useState('');

    // Log questions array whenever it updates
    // useEffect(() => {
    //     console.log(questions)
    // }, [questions])

    // Updates the form data when the research question, context, or existing question text changes
    useEffect(() => {
        setFormData({
            researchQuestion: researchQuestion,
            context: contextValue,
            existing: existingQuestionText
        })
    }, [researchQuestion, contextValue, existingQuestionText])

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            researchQuestion: researchQuestion,
            context: contextValue,
            existing: existingQuestionText // TODO: for each question added need to modify this
        }
        setFormData(data)
        setShowQuestionSection(true)
        console.log("Form data: ", data)
    }

    const handleGenerateQuestion = ()=> {
        setShowGenerateButtons(false)
    }

    const handleCreateQuestion = async () => {
        console.log("Creating manual question...")


        setShowGenerateButtons(false)
        setIsManualQuestion(true)
        setShowManualQuestionForm(true)
    }

    const handleSaveManualQuestion = (newQuestion) => {
        setQuestions(prevQuestions => [...prevQuestions, newQuestion])
        setManualQuestion(null)
        setManualQuestionType('')
        setIsManualQuestion(false)
    }

    const handleGenerate = async () => {
        console.log("Starting to generate question...")
        try {
            setLoading(true)

            const response = await axios.post(`http://localhost:5003/question-gen/generate-${questionType}`, formData)

            console.log(response)

            let newQuestion = {
                ...response.data,
                QuestionID: `QID${nextQuestionID}`
            }
            
            // If the question type is slider, hardcode the choices
            if (questionType === 'slider') {
                newQuestion = {
                    ...newQuestion,
                    Choices: {
                        "1": {
                            "Display": "Move the slider to your answer"
                        }
                    },
                    ChoiceOrder: ["1"]
                }
            }
            // add response.data to questions
            setQuestions(prevQuestions => [...prevQuestions, newQuestion])

            // Increment nextQuestionID
            setNextQuestionID(prevID => prevID + 1)

            // add questionText to existingQuestionText
            const question = response.data
            const questionText = question.QuestionText?.toLowerCase() || question.questiontext?.toLowerCase() || question.questionText?.toLowerCase();
            setExistingQuestionText([...existingQuestionText, {questionText: questionText}])
            setGeneratedQuestion(newQuestion)
        } catch (error) {
            console.error(`Error generating ${questionType} question: `, error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async () => {

        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:5003/manual-add/${questionType}`)
            
            console.log(response.data)

            let newQuestion = {
                ...response.data,
                QuestionID: `QID${nextQuestionID}`
            }

            // add response.data to questions
            setQuestions(prevQuestions => [...prevQuestions, newQuestion])

            // Increment nextQuestionID
            setNextQuestionID(prevID => prevID + 1)

            // add questionText to existingQuestionText
            const question = response.data
            const questionText = question.QuestionText?.toLowerCase() || question.questiontext?.toLowerCase() || question.questionText?.toLowerCase();
            setExistingQuestionText([...existingQuestionText, {questionText: questionText}])
            setGeneratedQuestion(newQuestion)

            setShowManualQuestionForm(false)

        } catch (error) {
            console.error(`Error creating manual question: `, error)
        } finally {
            setLoading(false)
        }
    }
    
    const handleAddQuestion = () => {
        console.log(questions)
        setGeneratedQuestion(null)
        setQuestionType('')
        setShowGenerateButtons(true)
    }

    // Handles editing a question
    const handleUpdateQuestion = (index, updatedQuestion) => {
        console.log("Updated question: ", updatedQuestion)
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions]
            updatedQuestions[index] = updatedQuestion
            return updatedQuestions
        })        
    }

    // Handles saving the survey
    // TODO: implement this
    const handleSaveSurvey = () => {
        console.log("Saving survey...")
        console.log(questions)
    }

    // Handles publishing the survey
    const handlePublishSurvey = async () => {
        const surveyName = window.prompt("Please name the survey:");
        if (!surveyName) {
            console.log("Survey name not provided");
            return;
        }

        const data = {
            username: username,
            surveyName: surveyName,
            questions: questions
        };
    
        console.log("Publishing survey with data...", data);
    
        try {
            setLoading(true)
            const response = await axios.post('http://localhost:5003/survey-gen/publish', data);
            console.log(response.data);
            if (response.data.link) {
                // show survey link in the pop-up
                const surveyLink = response.data.link;
                const userAction = window.confirm(`Survey published successfully!\nYou can access the participant link on the History page.\n\nWould you like to create a new survey?`);
                
                // if user click ok, then reset the survey
                if (userAction) {
                    handleResetSurvey();
                }
                
            }
        } catch (error) {
            console.error("Error publishing survey: ", error);
        } finally {
            setLoading(false);
        }
    };

    // Handles deleting questions by index
    const handleDeleteQuestion = (index) => {
        console.log("Deleting question at index: ", index)

        // log the question that will be deleted
        console.log("Question to be deleted: ", questions[index])

        // remove question from questions
        const updatedQuestions = questions.filter((question, i) => i !== index)
        setQuestions(updatedQuestions)
        // remove questionText from existingQuestionText
        const updatedExistingQuestionText = existingQuestionText.filter((question, i) => i !== index)
        setExistingQuestionText(updatedExistingQuestionText)


        // Log new questions array and existingQuestionText array
        console.log("Updated questions: ", updatedQuestions)
        console.log("Updated existingQuestionText: ", updatedExistingQuestionText)
    }

    // Handle moving questions
    const handleMoveQuestion = (index, direction) => {
        console.log(`Moving question at index ${index} ${direction}`); // Debug log
    
        // Copy the current questions array and the existingQuestionText array
        const updatedQuestions = [...questions];
        const updatedExistingQuestionText = [...existingQuestionText];

        // Move the problem according to the direction
        if (direction === 'up' && index > 0) {
            // Swap the current position with the previous position
            [updatedQuestions[index], updatedQuestions[index - 1]] = [updatedQuestions[index - 1], updatedQuestions[index]];
            [updatedExistingQuestionText[index], updatedExistingQuestionText[index - 1]] = [updatedExistingQuestionText[index - 1], updatedExistingQuestionText[index]];
        } else if (direction === 'down' && index < questions.length - 1) {
            // Swap the current position with the next position
            [updatedQuestions[index], updatedQuestions[index + 1]] = [updatedQuestions[index + 1], updatedQuestions[index]];
            [updatedExistingQuestionText[index], updatedExistingQuestionText[index + 1]] = [updatedExistingQuestionText[index + 1], updatedExistingQuestionText[index]];
        } else {
            console.log("Move direction out of bounds");
            return; // If the direction is invalid, return directly
        }
        // update the state
        setQuestions(updatedQuestions);
        setExistingQuestionText(updatedExistingQuestionText);

        console.log("Updated Questions: ", updatedQuestions);
        console.log("Updated Existing Question Text: ", updatedExistingQuestionText);
    };

    const handleResetSurvey = () => {
        setQuestions([]);
        setResearchQuestion('');
        setShowQuestionSection(false);
        
        //reset all form component
        setHypothesis('');
        setResearchContext(''); 
        setResearchObjectives(''); 
        setExistingKnowledge(''); 
        setKeyVariables(''); 
        setDemographicInfo(''); 
        setTopicsToExclude(''); 
        setExpectedOutcomes('');

        //others
        //setContextValue('');
        //setExistingQuestionText([]);
        //setGeneratedQuestion(null);
        //setQuestionType('');
        //setShowGenerateButtons(true);
        //setShowManualQuestionForm(false);
        //setSurveyLink('');
        //setIsManualQuestion(false);
        
    };

    return (
        <div>
            <h1>Survey Question Generation</h1>
            <div className="home-background"></div>
            <div>
                <FormComponent
                    researchQuestion={researchQuestion}
                    setResearchQuestion={setResearchQuestion}
                    contextValue={contextValue}
                    setContextValue={setContextValue}
                    handleSubmit={handleSubmit}
                    hypothesis={hypothesis}
                    setHypothesis={setHypothesis}
                    researchContext={researchContext}
                    setResearchContext={setResearchContext}
                    researchObjectives={researchObjectives}
                    setResearchObjectives={setResearchObjectives}
                    existingKnowledge={existingKnowledge}
                    setExistingKnowledge={setExistingKnowledge}
                    keyVariables={keyVariables}
                    setKeyVariables={setKeyVariables}
                    demographicInfo={demographicInfo}
                    setDemographicInfo={setDemographicInfo}
                    topicsToExclude={topicsToExclude}
                    setTopicsToExclude={setTopicsToExclude}
                    expectedOutcomes={expectedOutcomes}
                    setExpectedOutcomes={setExpectedOutcomes}
                />
            </div>

            {showQuestionSection && (
                <QuestionSection
                    questions={questions}
                    generatedQuestion={generatedQuestion}
                    showButtons={showGenerateButtons}
                    handleGenerateQuestion={handleGenerateQuestion}
                    handleCreateQuestion={handleCreateQuestion}
                    handleGenerate={handleGenerate}
                    handleCreate={handleCreate}
                    handleAddQuestion={handleAddQuestion}
                    questionType={questionType}
                    setQuestionType={setQuestionType}
                    onUpdateQuestion={handleUpdateQuestion}
                    handleSaveSurvey={handleSaveSurvey}
                    handlePublishSurvey={handlePublishSurvey}
                    onDeleteQuestion={handleDeleteQuestion}
                    onMoveQuestion={handleMoveQuestion}
                    showManualQuestionForm={showManualQuestionForm}
                    totalQuestions={questions.length}
                    loading={loading}
                />  
            )}

        </div>
    );
}

export default Home