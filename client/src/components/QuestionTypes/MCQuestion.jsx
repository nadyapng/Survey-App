import './QuestionTypes.css'
import { useState } from 'react'
import React from 'react'

const MCQuestion = ({
    question,
    onUpdate,
    index,
    onDelete,
    onMove,
    totalQuestions,
    isEditable
}) => {


    const [editMode, setEditMode] = useState(false); // Tracks whether the question is in edit mode
    const [editedQuestionText, setEditedQuestionText] = useState(question.QuestionText || question.questiontext || question.questionText); // Tracks the edited question text
    const [editedQuestionDescription, setEditedQuestionDescription] = useState(question.QuestionDescription || question.questiondescription || question.questionDescription); // Tracks the edited question description
    const [choices, setChoices] = useState(question.Choices); // Tracks the choices
    const [rearrangeMode, setRearrangeMode] = useState(false);


    const [forceResponse, setForceResponse] = useState(question.Validation?.Settings?.ForceResponse === 'ON' ? 'ON' : 'OFF'); // Tracks if the question is required (default to "OFF")

    // const questionText = question.QuestionText?.toLowerCase() || question.questiontext?.toLowerCase() || question.questionText?.toLowerCase();
    // const questionDescription = question.QuestionDescription?.toLowerCase() || question.questiondescription?.toLowerCase() || question.questionDescription?.toLowerCase();
    

    // Toggle edit mode
    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    // Handle input changes for question text and description
    const handleQuestionTextChange = (e) => {
        setEditedQuestionText(e.target.value);
    }

    const handleQuestionDescriptionChange = (e) => {
        setEditedQuestionDescription(e.target.value);
    }

    // Handle adding a new choice
    const handleAddChoice = () => {
        const newChoiceId = Object.keys(choices).length + 1;
        setChoices({
            ...choices,
            [newChoiceId]: { Display: '' }
        });
    }

    // Handle editing a choice
    const handleChoiceChange = (choiceId, value) => {
        setChoices({
            ...choices,
            [choiceId]: {...choices[choiceId], Display: value}
        })
    }

    // Handle deleting a choice
    const handleDeleteChoice = (choiceId) => {
        const updatedChoices = {...choices};
        delete updatedChoices[choiceId];
        setChoices(updatedChoices);
    }

    // Handle save changes
    const handleSave = () => {
        onUpdate(index, {
            ...question,
            QuestionText: editedQuestionText,
            QuestionDescription: editedQuestionDescription,
            Choices: choices,
            Validation: {
                Settings: {
                    ...question.Validation?.Settings,
                    ForceResponse: forceResponse
                }
            }
        });
        toggleEditMode();
    }

    const handleRearrange = () => {
        setRearrangeMode(true);
    };
    
    const handleCancelRearrange = () => {
        setRearrangeMode(false);
    };

    const toggleRequired = () => {
        setForceResponse(prev => prev === 'ON' ? 'OFF' : 'ON');
    }

    return (
        <div className="question-box">
            {editMode ? (
                <div className="edit-container">
                    <input
                        type="text"
                        value={editedQuestionText}
                        onChange={handleQuestionTextChange}
                        placeholder="Enter question text..."
                        className="input"
                    />
                    <textarea 
                        value={editedQuestionDescription}
                        onChange={handleQuestionDescriptionChange}
                        placeholder="Enter question description..."
                        className="input"
                        rows="3"
                    />
                    <h4>Choices</h4>

                    <ul className="choices">
                        {Object.keys(choices).map((choiceId, index) => (
                        <div>
                            <li key={index} className="mcq-choices">
                                <input 
                                    type="text"
                                    value={choices[choiceId].Display}
                                    onChange={(e) => handleChoiceChange(choiceId, e.target.value)}
                                    placeholder={`Enter choice ${index + 1}`}
                                    className="input"
                                />
                                <button onClick={() => handleDeleteChoice(choiceId)} className="delete-choices">Delete</button>
                            </li>
                        </div>
                        ))}
                    </ul>


                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={forceResponse === 'ON'}
                                onChange={toggleRequired}
                            />
                            This question is required
                        </label>
                    </div>

                    <div className="buttons-section">
                    <button onClick={handleAddChoice}>Add Choice</button>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={toggleEditMode}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>{editedQuestionText} (Type: Multi Choice)</h3>
                    <h4>Question Description</h4>
                    <p>{editedQuestionDescription ? editedQuestionDescription : "No question description"}</p>
                    <h4>Choices</h4>
                    <ul>
                        {Object.keys(choices).map((choiceId, index) => {
                            return (
                                <li key={index} className="mcq-choices">{choices[choiceId].Display}</li>
                            )
                        })}
                    </ul>
                    <p>Required: {forceResponse === 'ON' ? 'Yes' : 'No'}</p> {/* Display if the question is required or not */}
                    
                    {isEditable && (
                    <div className="buttons-section">
                        <>
                        <button onClick={toggleEditMode}>Edit</button>
                        <button onClick={() => onDelete(index)}>Delete</button>
                        {/* Rearrangement Controls */}
                        {rearrangeMode ? (
                            <div className="rearrange-controls">
                                <button onClick={() => { console.log('Move Up clicked'); onMove(index, 'up'); }} disabled={index === 0}>Move Up</button>
                                <button onClick={() => { console.log('Move Down clicked'); onMove(index, 'down'); }} disabled={index === totalQuestions - 1}>Move Down</button>
                                <button onClick={handleCancelRearrange}>Cancel</button>
                            </div>
                        ) : (
                            <button onClick={handleRearrange}>Rearrange</button>
                        )}

                        </>
                        </div>
                    )}

                    
                </div>
            )}
        </div>
    )
}

export default MCQuestion

