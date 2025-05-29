// GenerateQuestionControls.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GenerateQuestionControls from 'client/src/components/QuestionGeneration/GenerateQuestionControls.jsx';

describe('GenerateQuestionControls', () => {
    let handleGenerate, handleCreate, handleAddQuestion, setQuestionType;

    beforeEach(() => {
        handleGenerate = jest.fn().mockResolvedValue();
        handleCreate = jest.fn();
        handleAddQuestion = jest.fn();
        setQuestionType = jest.fn();
    });

    test('displays Create button when showManualQuestionForm is true and no question is generated', () => {
        render(
            <GenerateQuestionControls
                generatedQuestion={null}
                questionType=""
                setQuestionType={setQuestionType}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                showManualQuestionForm={true}
            />
        );

        expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    test('disables Create button when no question type is selected', () => {
        render(
            <GenerateQuestionControls
                generatedQuestion={null}
                questionType=""
                setQuestionType={setQuestionType}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                showManualQuestionForm={true}
            />
        );

        const createButton = screen.getByRole('button', { name: /create/i });
        expect(createButton).toBeDisabled();
    });

    test('calls handleCreate when Create button is clicked', () => {
        render(
            <GenerateQuestionControls
                generatedQuestion={null}
                questionType="mcq"
                setQuestionType={setQuestionType}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                showManualQuestionForm={true}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /create/i }));
        expect(handleCreate).toHaveBeenCalled();
    });

    test('displays Generate button when no question is generated and showManualQuestionForm is false', () => {
        render(
            <GenerateQuestionControls
                generatedQuestion={null}
                questionType=""
                setQuestionType={setQuestionType}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                showManualQuestionForm={false}
            />
        );

        expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
    });

    test('disables Generate button when no question type is selected', () => {
        render(
            <GenerateQuestionControls
                generatedQuestion={null}
                questionType=""
                setQuestionType={setQuestionType}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                showManualQuestionForm={false}
            />
        );

        const generateButton = screen.getByRole('button', { name: /generate/i });
        expect(generateButton).toBeDisabled();
    });

    test('calls handleGenerate when Generate button is clicked', async () => {
        render(
            <GenerateQuestionControls
                generatedQuestion={null}
                questionType="mcq"
                setQuestionType={setQuestionType}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                showManualQuestionForm={false}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /generate/i }));
        await waitFor(() => expect(handleGenerate).toHaveBeenCalled());
    });

    test('displays loading text while generating', async () => {
        render(
            <GenerateQuestionControls
                generatedQuestion={null}
                questionType="mcq"
                setQuestionType={setQuestionType}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                showManualQuestionForm={false}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /generate/i }));
        expect(screen.getByRole('button', { name: /generating.../i })).toBeInTheDocument();
    });
});
