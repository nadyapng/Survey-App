import React, { useState, useEffect } from 'react';
import './FormComponent.css'; // Import the external CSS file

const FormComponent = ({
    researchQuestion,
    setResearchQuestion,
    contextValue,
    setContextValue,
    handleSubmit,
    hypothesis,setHypothesis,
    researchContext,setResearchContext,
    researchObjectives,setResearchObjectives,
    existingKnowledge, setExistingKnowledge,
    keyVariables, setKeyVariables,
    demographicInfo, setDemographicInfo,
    topicsToExclude, setTopicsToExclude,
    expectedOutcomes, setExpectedOutcomes
}) => {
    const [isFormValid, setIsFormValid] = useState(false);

    // Function to check if all required fields are filled
    useEffect(() => {
        const checkFormValidity = () => {
            if (
//                 researchQuestion.trim() !== '' &&
                hypothesis.trim() !== '' &&
                researchContext.trim() !== '' &&
                researchObjectives.trim() !== '' &&
                keyVariables.trim() !== '' &&
                demographicInfo.trim() !== '' &&
                expectedOutcomes.trim() !== ''
            ) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        };
        checkFormValidity();
    }, [
        researchQuestion,
        hypothesis,
        researchContext,
        researchObjectives,
        keyVariables,
        demographicInfo,
        expectedOutcomes,
    ]);

    const updateContextValue = () => {
        const concatenatedValue = [
            `Hypothesis: ${hypothesis}`,
            `Research Context: ${researchContext}`,
            `Research Objectives: ${researchObjectives}`,
            `Existing Knowledge: ${existingKnowledge}`,
            `Key Variables or Themes: ${keyVariables}`,
            `Demographic Information: ${demographicInfo}`,
            `Topics or Questions to Exclude: ${topicsToExclude}`,
            `Expected Outcomes: ${expectedOutcomes}`,
        ].join('\n');

        setContextValue(concatenatedValue);
    };

    const clearInput = (setter) => {
        setter('');
    };

    return (
        <div className="form-container">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (isFormValid) {
                        updateContextValue();
                        handleSubmit(e);
                    }
                }}
            >
                <div className="question-container">
                    <h3>Enter Research Question/Topic (Required)</h3>
                    <div className="input-group">
                        <input
                            type="text"
                            value={researchQuestion}
                            onChange={(e) => setResearchQuestion(e.target.value)}
                            className="input"
                            required
                        />
                        <button type="button" onClick={() => clearInput(setResearchQuestion)} className="clear-button">Clear</button>
                    </div>
                </div>

                <div className="question-container">
                <h2>Tell us a bit more</h2>
                <h3>Enter Hypothesis (Required)</h3>
                <div className="input-group required">
                    <textarea
                        value={hypothesis}
                        onChange={(e) => setHypothesis(e.target.value)}
                        className="input"
                        rows="2"
                        required
                    />
                    <button type="button" onClick={() => setHypothesis('')} className="clear-button">Clear</button>
                </div>

                <h3>Enter Research Context (Required)</h3>
                <div className="input-group required">
                    <textarea
                        value={researchContext}
                        onChange={(e) => setResearchContext(e.target.value)}
                        className="input"
                        rows="2"
                        required
                    />
                    <button type="button" onClick={() => setResearchContext('')} className="clear-button">Clear</button>
                </div>

                <h3>Enter Research Objectives/Goals (Required)</h3>
                <div className="input-group required">
                    <textarea
                        value={researchObjectives}
                        onChange={(e) => setResearchObjectives(e.target.value)}
                        className="input"
                        rows="3"
                        required
                    />
                    <button type="button" onClick={() => setResearchObjectives('')} className="clear-button">Clear</button>
                </div>

                <h3>Enter Existing Knowledge (Optional)</h3>
                <div className="input-group">
                    <textarea
                        value={existingKnowledge}
                        onChange={(e) => setExistingKnowledge(e.target.value)}
                        className="input"
                        rows="2"
                    />
                    <button type="button" onClick={() => setExistingKnowledge('')} className="clear-button">Clear</button>
                </div>

                <h3>Enter Key Variables or Themes (Required)</h3>
                <div className="input-group required">
                    <textarea
                        value={keyVariables}
                        onChange={(e) => setKeyVariables(e.target.value)}
                        className="input"
                        rows="2"
                        required
                    />
                    <button type="button" onClick={() => setKeyVariables('')} className="clear-button">Clear</button>
                </div>

                <h3>Enter Demographic Info (Required)</h3>
                <div className="input-group required">
                    <textarea
                        value={demographicInfo}
                        onChange={(e) => setDemographicInfo(e.target.value)}
                        className="input"
                        rows="2"
                        required
                    />
                    <button type="button" onClick={() => setDemographicInfo('')} className="clear-button">Clear</button>
                </div>

                <h3>Enter Topics or Questions to Exclude (Optional)</h3>
                <div className="input-group">
                    <textarea
                        value={topicsToExclude}
                        onChange={(e) => setTopicsToExclude(e.target.value)}
                        className="input"
                        rows="2"
                    />
                    <button type="button" onClick={() => setTopicsToExclude('')} className="clear-button">Clear</button>
                </div>

                <h3>Enter Expected Outcomes (Required)</h3>
                <div className="input-group required">
                    <textarea
                        value={expectedOutcomes}
                        onChange={(e) => setExpectedOutcomes(e.target.value)}
                        className="input"
                        rows="2"
                        required
                    />
                    <button type="button" onClick={() => setExpectedOutcomes('')} className="clear-button">Clear</button>
                </div>
                </div>

                <button type="submit" className="submit-button" disabled={!isFormValid}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormComponent;
