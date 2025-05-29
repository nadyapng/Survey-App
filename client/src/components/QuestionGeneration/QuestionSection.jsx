/*
This component is for showing everything related to viewing, modifying and generating questions
*/
import React from 'react';
import GenerateQuestionControls from './GenerateQuestionControls';
import CreateQuestionControls from './CreateQuestionControls';
import QuestionDisplay from '../QuestionDisplay';
import './QuestionSection.css'

const QuestionSection = ({
    questions,
    generatedQuestion,
    showButtons,
    handleGenerateQuestion,
    handleCreateQuestion,
    handleGenerate,
    handleCreate,
    handleAddQuestion,
    questionType,
    setQuestionType,
    onUpdateQuestion,
    handleSaveSurvey,
    handlePublishSurvey,
    onDeleteQuestion,
    showManualQuestionForm,
    onMoveQuestion,
    totalQuestions,
    loading
}) => {
    return (
        <div className="question-section">
            {questions.map((question, index) => (
                <div key={question.QuestionID}>
                    <h3>Question {index + 1}</h3>
                    <QuestionDisplay
                        questions={questions}
                        index={index}
                        onUpdate={onUpdateQuestion}
                        onDelete={onDeleteQuestion}
                        question={question}
                        onMove={onMoveQuestion}
                        totalQuestions={totalQuestions}
                        isEditable={true}
                    />
                </div>
            ))}
            {showButtons ? (
                <div className="buttons-section">
                    <button onClick={handleGenerateQuestion}>Generate Question</button>
                    <button onClick={handleCreateQuestion}>Create Question</button>
                </div>
            ) : (

                <GenerateQuestionControls
                    generatedQuestion={generatedQuestion}
                    questionType={questionType}
                    setQuestionType={setQuestionType}
                    handleGenerate={handleGenerate}
                    handleCreate={handleCreate}
                    handleAddQuestion={handleAddQuestion}
                    showManualQuestionForm={showManualQuestionForm}
                />
                
            )}

        

            
            {questions.length > 0 && (
                <div className="buttons-section">
                    {/* <button onClick={handlePublishSurvey}>Publish Survey</button> */}

                    <button onClick={handlePublishSurvey} disabled={!questionType || loading}>
                        {loading ? 'Publishing...' : 'Publish'}
                    </button>
                </div>


            )}

            
        </div>
    );
};

export default QuestionSection;
