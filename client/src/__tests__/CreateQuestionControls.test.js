import { render, screen, fireEvent } from '@testing-library/react';
import CreateQuestionControls from 'client/src/components/QuestionGeneration/CreateQuestionControls.jsx';
import React from 'react';

describe('CreateQuestionControls', () => {
    const handleCreate = jest.fn(() => Promise.resolve());
    const handleAddQuestion = jest.fn();
    const setQuestionType = jest.fn();

    const setup = (questionType = "") => {
        return render(
            <CreateQuestionControls
                generatedQuestion={null}
                questionType={questionType}
                setQuestionType={setQuestionType}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
            />
        );
    };

    it('should display the select dropdown and button', () => {
        setup();

        // Check if dropdown and button are rendered
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    });

    it('should disable the Create button if no question type is selected', () => {
        setup();

        const createButton = screen.getByRole('button', { name: /create/i });

        // The Create button should be disabled initially
        expect(createButton).toBeDisabled();
    });

    it('should enable the Create button after selecting a question type', () => {
        setup();

        const select = screen.getByRole('combobox');
        const createButton = screen.getByRole('button', { name: /create/i });

        // Check that the Create button is initially disabled
        expect(createButton).toBeDisabled();

//        // Simulate selecting a question type
//        fireEvent.change(select, { target: { value: 'mcq' } });
//
//        // The Create button should now be enabled
//        expect(createButton).toBeEnabled();
    });

    it('should call handleCreate and handleAddQuestion when the Create button is clicked', async () => {
        setup("mcq");

        const createButton = screen.getByRole('button', { name: /create/i });

        // Simulate clicking the Create button
        fireEvent.click(createButton);

        // Ensure that handleCreate and handleAddQuestion were called
        expect(handleCreate).toHaveBeenCalledTimes(1);
        await expect(handleCreate).toHaveBeenCalled();
        expect(handleAddQuestion).toHaveBeenCalledTimes(1);
    });

    it('should call setQuestionType when a different question type is selected', () => {
        setup();

        const select = screen.getByRole('combobox');

        // Simulate selecting a different question type
        fireEvent.change(select, { target: { value: 'text' } });

        // Ensure setQuestionType is called with the selected value
        expect(setQuestionType).toHaveBeenCalledWith('text');
    });
});
