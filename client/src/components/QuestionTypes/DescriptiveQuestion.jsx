import { useState } from 'react';
import React from 'react';
import './QuestionTypes.css'

const DescriptiveQuestion = ({ question, onUpdate, index, onDelete, onMove, totalQuestions, isEditable }) => {

    const [editMode, setEditMode] = useState(false)
    const [editedQuestionText, setEditedQuestionText] = useState(question.QuestionText || question.questiontext || question.questionText)
    const [editedQuestionDescription, setEditedQuestionDescription] = useState(question.QuestionDescription || question.questiondescription || question.questionDescription)
    const [rearrangeMode, setRearrangeMode] = useState(false);

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

    const handleSave = () => {
        onUpdate(index, {
            ...question,
            QuestionText: editedQuestionText,
            QuestionDescription: editedQuestionDescription
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
                        placeholder="Enter title..."
                        className="input"
                    />
                    <textarea
                        value={editedQuestionDescription}
                        onChange={handleQuestionDescriptionChange}
                        placeholder="Enter description..."
                        className="input"
                        rows="3"
                    />
                    <div className="buttons-section">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={toggleEditMode}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>{editedQuestionText} (Type: Descriptive)</h3>
                    <h4>Description</h4>
                    <p>{editedQuestionDescription ? editedQuestionDescription : "No description"}</p>

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

export default DescriptiveQuestion