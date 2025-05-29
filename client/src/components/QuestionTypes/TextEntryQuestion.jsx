import { useState } from 'react';
import React from 'react';
import './QuestionTypes.css'

const TextEntryQuestion = ({ question, onUpdate, index, onDelete, onMove, totalQuestions, isEditable }) => {

    const [editMode, setEditMode] = useState(false)
    const [editedQuestionText, setEditedQuestionText] = useState(question.QuestionText || question.questiontext || question.questionText)
    const [editedQuestionDescription, setEditedQuestionDescription] = useState(question.QuestionDescription || question.questiondescription || question.questionDescription)
    const [rearrangeMode, setRearrangeMode] = useState(false);
    const [forceResponse, setForceResponse] = useState(question.Validation?.Settings?.ForceResponse === 'ON' ? 'ON' : 'OFF'); // Tracks if the question is required (default to "OFF")

    // const questionText = question.QuestionText?.toLowerCase() || question.questiontext?.toLowerCase() || question.questionText?.toLowerCase();
    // const questionDescription = question.QuestionDescription?.toLowerCase() || question.questiondescription?.toLowerCase() || question.questionDescription?.toLowerCase();
    

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const handleQuestionTextChange = (e) => {
        setEditedQuestionText(e.target.value);
    }

    const handleQuestionDescriptionChange = (e) => {
        setEditedQuestionDescription(e.target.value);
    }

    // Toggle required (ForceResponse)
    const toggleRequired = () => {
        setForceResponse(prev => prev === 'ON' ? 'OFF' : 'ON');
    }

    const handleSave = () => {
        onUpdate(index, {
            ...question,
            QuestionText: editedQuestionText,
            QuestionDescription: editedQuestionDescription,
            Validation: {
                Settings: {
                    ...question.Validation?.Settings,
                    ForceResponse: forceResponse // Set "ON" or "OFF"
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
                    {/* Toggle Required Button */}
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
                    <button onClick={handleSave}>Save</button>
                    <button onClick={toggleEditMode}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>{editedQuestionText} (Type: Text Entry)</h3>
                    <h4>Question Description</h4>
                    <p>{editedQuestionDescription ? editedQuestionDescription : "No question description"}</p>
                    <p>Required: {forceResponse === 'ON' ? 'Yes' : 'No'}</p> {/* Display if the question is required or not */}


                    {isEditable && (
                    <div className="buttons-section">
                        <>
                            <button onClick={toggleEditMode}>Edit</button>
                            <button onClick={() => onDelete(index)}>Delete</button>
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

export default TextEntryQuestion