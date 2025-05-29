import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionSection from 'client/src/components/QuestionGeneration/QuestionSection.jsx';

describe('QuestionSection', () => {
    let questions, generatedQuestion, showButtons, handleGenerateQuestion, handleCreateQuestion, handleGenerate, handleCreate, handleAddQuestion, questionType, setQuestionType, onUpdateQuestion, handleSaveSurvey, handlePublishSurvey, onDeleteQuestion, showManualQuestionForm;

    beforeEach(() => {
        questions = [
            { QuestionID: 1, text: 'What is your name?' },
            { QuestionID: 2, text: 'What is your age?' }
        ];
        generatedQuestion = null; // Adjust based on your needs
        showButtons = true;
        handleGenerateQuestion = jest.fn();
        handleCreateQuestion = jest.fn();
        handleGenerate = jest.fn();
        handleCreate = jest.fn();
        handleAddQuestion = jest.fn();
        questionType = '';
        setQuestionType = jest.fn();
        onUpdateQuestion = jest.fn();
        handleSaveSurvey = jest.fn();
        handlePublishSurvey = jest.fn();
        onDeleteQuestion = jest.fn();
        showManualQuestionForm = false;
    });

    test('renders questions correctly', () => {
        render(
            <QuestionSection
                questions={questions}
                generatedQuestion={generatedQuestion}
                showButtons={showButtons}
                handleGenerateQuestion={handleGenerateQuestion}
                handleCreateQuestion={handleCreateQuestion}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                questionType={questionType}
                setQuestionType={setQuestionType}
                onUpdateQuestion={onUpdateQuestion}
                handleSaveSurvey={handleSaveSurvey}
                handlePublishSurvey={handlePublishSurvey}
                onDeleteQuestion={onDeleteQuestion}
                showManualQuestionForm={showManualQuestionForm}
            />
        );

        expect(screen.getByText('Question 1')).toBeInTheDocument();
        expect(screen.getByText('What is your name?')).toBeInTheDocument();
        expect(screen.getByText('Question 2')).toBeInTheDocument();
        expect(screen.getByText('What is your age?')).toBeInTheDocument();
    });

    test('shows buttons when showButtons is true', () => {
        render(
            <QuestionSection
                questions={questions}
                generatedQuestion={generatedQuestion}
                showButtons={showButtons}
                handleGenerateQuestion={handleGenerateQuestion}
                handleCreateQuestion={handleCreateQuestion}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                questionType={questionType}
                setQuestionType={setQuestionType}
                onUpdateQuestion={onUpdateQuestion}
                handleSaveSurvey={handleSaveSurvey}
                handlePublishSurvey={handlePublishSurvey}
                onDeleteQuestion={onDeleteQuestion}
                showManualQuestionForm={showManualQuestionForm}
            />
        );

        expect(screen.getByRole('button', { name: /generate question/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create question/i })).toBeInTheDocument();
    });

    test('does not show buttons when showButtons is false', () => {
        showButtons = false;

        render(
            <QuestionSection
                questions={questions}
                generatedQuestion={generatedQuestion}
                showButtons={showButtons}
                handleGenerateQuestion={handleGenerateQuestion}
                handleCreateQuestion={handleCreateQuestion}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                questionType={questionType}
                setQuestionType={setQuestionType}
                onUpdateQuestion={onUpdateQuestion}
                handleSaveSurvey={handleSaveSurvey}
                handlePublishSurvey={handlePublishSurvey}
                onDeleteQuestion={onDeleteQuestion}
                showManualQuestionForm={showManualQuestionForm}
            />
        );

        expect(screen.queryByRole('button', { name: /generate question/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /create question/i })).not.toBeInTheDocument();
    });

    test('calls handleGenerateQuestion when Generate Question button is clicked', () => {
        render(
            <QuestionSection
                questions={questions}
                generatedQuestion={generatedQuestion}
                showButtons={showButtons}
                handleGenerateQuestion={handleGenerateQuestion}
                handleCreateQuestion={handleCreateQuestion}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                questionType={questionType}
                setQuestionType={setQuestionType}
                onUpdateQuestion={onUpdateQuestion}
                handleSaveSurvey={handleSaveSurvey}
                handlePublishSurvey={handlePublishSurvey}
                onDeleteQuestion={onDeleteQuestion}
                showManualQuestionForm={showManualQuestionForm}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /generate question/i }));
        expect(handleGenerateQuestion).toHaveBeenCalled();
    });

    test('calls handleCreateQuestion when Create Question button is clicked', () => {
        render(
            <QuestionSection
                questions={questions}
                generatedQuestion={generatedQuestion}
                showButtons={showButtons}
                handleGenerateQuestion={handleGenerateQuestion}
                handleCreateQuestion={handleCreateQuestion}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                questionType={questionType}
                setQuestionType={setQuestionType}
                onUpdateQuestion={onUpdateQuestion}
                handleSaveSurvey={handleSaveSurvey}
                handlePublishSurvey={handlePublishSurvey}
                onDeleteQuestion={onDeleteQuestion}
                showManualQuestionForm={showManualQuestionForm}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /create question/i }));
        expect(handleCreateQuestion).toHaveBeenCalled();
    });

    test('shows survey actions when questions are present', () => {
        render(
            <QuestionSection
                questions={questions}
                generatedQuestion={generatedQuestion}
                showButtons={showButtons}
                handleGenerateQuestion={handleGenerateQuestion}
                handleCreateQuestion={handleCreateQuestion}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                questionType={questionType}
                setQuestionType={setQuestionType}
                onUpdateQuestion={onUpdateQuestion}
                handleSaveSurvey={handleSaveSurvey}
                handlePublishSurvey={handlePublishSurvey}
                onDeleteQuestion={onDeleteQuestion}
                showManualQuestionForm={showManualQuestionForm}
            />
        );

        expect(screen.getByRole('button', { name: /save survey/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /publish survey/i })).toBeInTheDocument();
    });

    test('does not show survey actions when there are no questions', () => {
        questions = [];

        render(
            <QuestionSection
                questions={questions}
                generatedQuestion={generatedQuestion}
                showButtons={showButtons}
                handleGenerateQuestion={handleGenerateQuestion}
                handleCreateQuestion={handleCreateQuestion}
                handleGenerate={handleGenerate}
                handleCreate={handleCreate}
                handleAddQuestion={handleAddQuestion}
                questionType={questionType}
                setQuestionType={setQuestionType}
                onUpdateQuestion={onUpdateQuestion}
                handleSaveSurvey={handleSaveSurvey}
                handlePublishSurvey={handlePublishSurvey}
                onDeleteQuestion={onDeleteQuestion}
                showManualQuestionForm={showManualQuestionForm}
            />
        );

        expect(screen.queryByRole('button', { name: /save survey/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /publish survey/i })).not.toBeInTheDocument();
    });
});
