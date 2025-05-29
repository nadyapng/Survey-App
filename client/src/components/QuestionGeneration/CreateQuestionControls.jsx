import React from 'react';
import { useState } from 'react';
import './Select.css'
const CreateQuestionControls = ({
    generatedQuestion,
    questionType,
    setQuestionType,
    handleCreate,
    handleAddQuestion,
}) => {

    const handleCreateClick = async () => {
        console.log("Creating question of type: ", questionType)
        await handleCreate();
        handleAddQuestion();
    }


    return (
        <div className="question-type-container">
            <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                <option value="" disabled>Select question type...</option>
                <option value="mcq">Multiple Choice</option>
                <option value="matrix">Matrix</option>
                <option value="text">Text Input</option>
                <option value="slider">Slider</option>
                <option value="descriptive">Descriptive</option>
            </select>
            <button onClick={handleCreateClick} disabled={!questionType}>
                Create
            </button>
        </div>
    )
}

export default CreateQuestionControls;