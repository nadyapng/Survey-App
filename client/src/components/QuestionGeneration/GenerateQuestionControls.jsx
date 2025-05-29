// GenerateQuestionControls.js
import React from 'react';
import { useState } from 'react';
import './Select.css'

const GenerateQuestionControls = ({
    generatedQuestion,
    questionType,
    setQuestionType,
    handleGenerate,
    handleCreate,
    handleAddQuestion,
    showManualQuestionForm
}) => {
    
    const [loading, setLoading] = useState(false);

    const handleGenerateClick = async () => {
        setLoading(true); // Disable the button
        await handleGenerate(); // Wait for handleGenerate to finish
        setLoading(false); // Enable the button again
    };
    
    return (
        <div>
            {generatedQuestion ? (
                <div>
                    <button onClick={handleAddQuestion}>Add Question</button>
                </div>
            ) : (
                showManualQuestionForm ? (
                    <div className="generate-select">
                        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} data-testid="question-type-select">
                            <option value="" disabled>Select question type...</option>
                            <option value="mcq">Multiple Choice</option>
                            <option value="matrix">Matrix</option>
                            <option value="text">Text Input</option>
                            <option value="slider">Slider</option>
                            <option value="descriptive">Descriptive</option>
                        </select>


                        <button onClick={handleCreate} disabled={!questionType || loading}>
                            Create
                        </button>
                        
                    </div>
                ) : (
                    // For automatic question generation
                    <div>
                        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}data-testid="question-type-generate">
                            <option value="" disabled>Select question type...</option>
                            <option value="mcq">Multiple Choice</option>
                            <option value="matrix">Matrix</option>
                            <option value="text">Text Input</option>
                            <option value="slider">Slider</option>
                        </select>


                        <button onClick={handleGenerateClick} disabled={!questionType || loading}>
                            {loading ? 'Generating...' : 'Generate'}
                        </button>
                        
                    </div>
                )

                
                
            )}
        </div>
    );
};

export default GenerateQuestionControls;
