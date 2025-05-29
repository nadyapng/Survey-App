import React, { useState } from 'react';

const ManualMCQuestion = ({ onSave, onCancel }) => {
    const [questionText, setQuestionText] = useState('');
    const [questionDescription, setQuestionDescription] = useState('');
    const [choices, setChoices] = useState({}); // Stores the choices
    const [choiceCount, setChoiceCount] = useState(0); // Tracks how many choices are added

    // Handle input changes for question text and description
    const handleQuestionTextChange = (e) => {
        setQuestionText(e.target.value);
    };

    const handleQuestionDescriptionChange = (e) => {
        setQuestionDescription(e.target.value);
    };

    // Handle adding a new choice
    const handleAddChoice = () => {
        setChoiceCount(choiceCount + 1);
        setChoices({
            ...choices,
            [choiceCount]: { Display: '' }
        });
    };

    // Handle choice text input
    const handleChoiceChange = (choiceId, value) => {
        setChoices({
            ...choices,
            [choiceId]: { Display: value }
        });
    };

    // Handle removing a choice
    const handleDeleteChoice = (choiceId) => {
        const updatedChoices = { ...choices };
        delete updatedChoices[choiceId];
        setChoices(updatedChoices);
    };

    // Handle save action
    const handleSave = () => {
        if (questionText.trim() === '' || Object.keys(choices).length === 0) {
            alert('Please fill out the question text and at least one choice.');
            return;
        }

        const newQuestion = {
            QuestionText: questionText,
            QuestionDescription: questionDescription,
            QuestionType: 'mcq',
            Choices: choices,
        };

        console.log(newQuestion)

        onSave(newQuestion); // Pass new question back to parent component
    };

    return (
        <div className="manual-question-form">
            <h3>Create Multiple Choice Question</h3>
            <input
                type="text"
                value={questionText}
                onChange={handleQuestionTextChange}
                placeholder="Enter question text..."
                className="input"
                required
            />
            <textarea
                value={questionDescription}
                onChange={handleQuestionDescriptionChange}
                placeholder="Enter question description..."
                className="input"
                rows="3"
            />
            
            <h4>Choices</h4>
            <ul>
                {Object.keys(choices).map((choiceId) => (
                    <li key={choiceId} className="mcq-choices">
                        <input
                            type="text"
                            value={choices[choiceId].Display}
                            onChange={(e) => handleChoiceChange(choiceId, e.target.value)}
                            placeholder={`Enter choice ${parseInt(choiceId) + 1}`}
                            className="input"
                        />
                        <button onClick={() => handleDeleteChoice(choiceId)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddChoice}>Add Choice</button>

            <div className="question-actions">
                <button onClick={handleSave}>Save Question</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default ManualMCQuestion;
