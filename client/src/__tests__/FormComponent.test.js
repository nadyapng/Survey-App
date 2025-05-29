import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Update this line

import FormComponent from 'client/src/components/QuestionGeneration/FormComponent.jsx'; // Make sure this path matches the actual location

describe('FormComponent', () => {
    const mockSubmit = jest.fn();

    const renderFormComponent = (props = {}) => {
        return render(
            <FormComponent
                researchQuestion={props.researchQuestion || ''}
                setResearchQuestion={props.setResearchQuestion || jest.fn()}
                contextValue={props.contextValue || ''}
                setContextValue={props.setContextValue || jest.fn()}
                handleSubmit={props.handleSubmit || mockSubmit}
                hypothesis={props.hypothesis || ''}
                setHypothesis={props.setHypothesis || jest.fn()}
                researchContext={props.researchContext || ''}
                setResearchContext={props.setResearchContext || jest.fn()}
                researchObjectives={props.researchObjectives || ''}
                setResearchObjectives={props.setResearchObjectives || jest.fn()}
                existingKnowledge={props.existingKnowledge || ''}
                setExistingKnowledge={props.setExistingKnowledge || jest.fn()}
                keyVariables={props.keyVariables || ''}
                setKeyVariables={props.setKeyVariables || jest.fn()}
                demographicInfo={props.demographicInfo || ''}
                setDemographicInfo={props.setDemographicInfo || jest.fn()}
                topicsToExclude={props.topicsToExclude || ''}
                setTopicsToExclude={props.setTopicsToExclude || jest.fn()}
                expectedOutcomes={props.expectedOutcomes || ''}
                setExpectedOutcomes={props.setExpectedOutcomes || jest.fn()}
            />
        );
    };

    it('renders form correctly', () => {
        renderFormComponent();

        // Check for some form elements
        expect(screen.getByPlaceholderText('Enter Research Question/Topic... (required)')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter Hypothesis... (required)')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter Research Objectives/Goals... (required)')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    it('disables submit button when required fields are empty', () => {
        renderFormComponent();

        const submitButton = screen.getByRole('button', { name: /Submit/i });
        expect(submitButton).toBeDisabled();
    });

    it('enables submit button when all required fields are filled', () => {
        const setResearchQuestion = jest.fn();
        const setHypothesis = jest.fn();
        const setResearchContext = jest.fn();
        const setResearchObjectives = jest.fn();
        const setKeyVariables = jest.fn();
        const setDemographicInfo = jest.fn();
        const setExpectedOutcomes = jest.fn();

        renderFormComponent({
            researchQuestion: 'How does technology affect learning?',
            hypothesis: 'It improves it.',
            researchContext: 'In schools',
            researchObjectives: 'To analyze the impact of tech',
            keyVariables: 'Technology, Students, Learning',
            demographicInfo: '18-25 years',
            expectedOutcomes: 'Increased understanding of tech in education',
        });

        const submitButton = screen.getByRole('button', { name: /Submit/i });
        expect(submitButton).toBeEnabled();
    });

    it('calls handleSubmit when the form is submitted and valid', () => {
        renderFormComponent({
            researchQuestion: 'How does technology affect learning?',
            hypothesis: 'It improves it.',
            researchContext: 'In schools',
            researchObjectives: 'To analyze the impact of tech',
            keyVariables: 'Technology, Students, Learning',
            demographicInfo: '18-25 years',
            expectedOutcomes: 'Increased understanding of tech in education',
        });

        const submitButton = screen.getByRole('button', { name: /Submit/i });

        fireEvent.click(submitButton);

        expect(mockSubmit).toHaveBeenCalled();
    });

    it('clears input when clear button is clicked', () => {
        const setResearchQuestion = jest.fn();
        const setHypothesis = jest.fn();

        renderFormComponent({
            researchQuestion: 'Sample Question',
            hypothesis: 'Sample Hypothesis',
            setResearchQuestion,
            setHypothesis,
        });

        const clearQuestionButton = screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearQuestionButton);

        expect(setResearchQuestion).toHaveBeenCalledWith('');
    });
});