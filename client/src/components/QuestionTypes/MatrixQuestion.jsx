import { useState } from 'react';
import './QuestionTypes.css';
import React from 'react';

const MatrixQuestion = ({ question, index, onUpdate, onDelete, onMove, totalQuestions, isEditable }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedQuestionText, setEditedQuestionText] = useState(question.QuestionText || question.questiontext || question.questionText);
    const [editedQuestionDescription, setEditedQuestionDescription] = useState(question.QuestionDescription || question.questiondescription || question.questionDescription);
    const [choices, setChoices] = useState(question.Choices); // Tracks the matrix rows
    const [answers, setAnswers] = useState(question.Answers); // Tracks the matrix columns
    const [rearrangeMode, setRearrangeMode] = useState(false);
    const [forceResponse, setForceResponse] = useState(question.Validation?.Settings?.ForceResponse === 'ON' ? 'ON' : 'OFF'); // Tracks if the question is required (default to "OFF")

    // Toggle edit mode
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    // Handle changes to the question text and description
    const handleQuestionTextChange = (e) => {
        setEditedQuestionText(e.target.value);
    };

    const handleQuestionDescriptionChange = (e) => {
        setEditedQuestionDescription(e.target.value);
    };

    // Handle changes to the choices (rows)
    const handleChoiceChange = (choiceId, value) => {
        setChoices({
            ...choices,
            [choiceId]: { ...choices[choiceId], Display: value }
        });
    };

    // Handle changes to the answers (columns)
    const handleAnswerChange = (answerId, value) => {
        setAnswers({
            ...answers,
            [answerId]: { ...answers[answerId], Display: value }
        });
    };

    // Add a new choice (row)
    const handleAddChoice = () => {
        const newChoiceId = Object.keys(choices).length + 1;
        setChoices({
            ...choices,
            [newChoiceId]: { Display: '' }
        });
    };

    // Add a new answer (column)
    const handleAddAnswer = () => {
        const newAnswerId = Object.keys(answers).length + 1;
        setAnswers({
            ...answers,
            [newAnswerId]: { Display: '' }
        });
    };

    const toggleRequired = () => {
        setForceResponse(prev => prev === 'ON' ? 'OFF' : 'ON');
    };

    // Save the changes
    const handleSave = () => {
        onUpdate(index, {
            ...question,
            QuestionText: editedQuestionText,
            QuestionDescription: editedQuestionDescription,
            Choices: choices,
            Answers: answers,
            ChoiceOrder: Object.keys(choices),
            AnswerOrder: Object.keys(answers),
            Validation: {
                Settings: {
                    ...question.Validation?.Settings,
                    ForceResponse: forceResponse // Set "ON" or "OFF"
                }
            }
        });
        toggleEditMode();
    };

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
                    {/* Editable question text and description */}
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

                    {/* Editable table for matrix choices and answers */}
                    <h4>Matrix Choices and Answers</h4>
                    <table className="mcq-choices">
                        <thead>
                            <tr className ="matrix-gap">
                                <th></th>
                                {Object.keys(answers).map((answerId, i) => (
                                    <th key={i}>
                                        <input
                                            type="text"
                                            value={answers[answerId].Display}
                                            onChange={(e) => handleAnswerChange(answerId, e.target.value)}
                                            placeholder={`Answer ${i + 1}`}
                                            className="input"
                                        />
                                    </th>
                                ))}
                                <th>
                                    <button onClick={handleAddAnswer}>Add Answer</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(choices).map((choiceId, i) => (
                                <tr key={i}>
                                    <td>
                                        <input
                                            type="text"
                                            value={choices[choiceId].Display}
                                            onChange={(e) => handleChoiceChange(choiceId, e.target.value)}
                                            placeholder={`Choice ${i + 1}`}
                                            className="input"
                                        />
                                    </td>
                                    {Object.keys(answers).map((answerId, j) => (
                                        <td key={j}>
                                            <input type="radio" name={`choice-${choiceId}`} value={answerId} disabled />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <button onClick={handleAddChoice}>Add Choice</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                    {/* Save and cancel buttons */}
                    <div className="buttons-section">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={toggleEditMode}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>{editedQuestionText} (Type: Matrix)</h3>
                    <h4>Question Description</h4>
                    <p>{editedQuestionDescription ? editedQuestionDescription : "No question description"}</p>

                    <h4>Choices</h4>
                    <table className="choices">
                        <thead>
                            <tr>
                                <th></th>
                                {question.AnswerOrder.map((answerId, i) => (
                                    <th key={i}>{question.Answers[answerId].Display}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {question.ChoiceOrder.map((choiceId, i) => (
                                <tr key={i}>
                                    <td>{question.Choices[choiceId].Display}</td>
                                    {question.AnswerOrder.map((answerId, j) => (
                                        <td key={j}>
                                            <input type="radio" name={`chioce-${choiceId}`} value={answerId} disabled />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Required: {forceResponse === 'ON' ? 'Yes' : 'No'}</p> {/* Display if the question is required or not */}

                    {isEditable && (
                        <>
                        <div className="buttons-section">
                            {/* Edit button */}
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
                        </div>
                        </>
                    )}


                </div>
            )}
        </div>
    );
};

export default MatrixQuestion;
