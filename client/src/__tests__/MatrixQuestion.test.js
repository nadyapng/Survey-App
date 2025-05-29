import { render, screen, fireEvent } from '@testing-library/react';
import MatrixQuestion from 'client/src/components/QuestionTypes/MatrixQuestion.jsx';
import React from 'react';
// Mock data for testing
describe('MatrixQuestion Component', () => {
    const mockQuestion = {
        QuestionText: "What is your opinion?",
        QuestionDescription: "Please select your response.",
        Choices: { 1: { Display: 'Choice 1' }, 2: { Display: 'Choice 2' } },
        Answers: { 1: { Display: 'Answer 1' }, 2: { Display: 'Answer 2' } },
        ChoiceOrder: [1, 2],
        AnswerOrder: [1, 2],
        Validation: { Settings: { ForceResponse: 'OFF' } }
    };

    const mockUpdate = jest.fn();
    const mockDelete = jest.fn();
    const mockMove = jest.fn();

    test('renders matrix question in view mode', () => {
        const { getByText } = render(
            <MatrixQuestion
                question={mockQuestion}
                index={0}
                onUpdate={mockUpdate}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={1}
                isEditable={true}
            />
        );

        // Check if question text and description are rendered
        expect(getByText(/what is your opinion\?/i)).toBeInTheDocument();
        expect(getByText(/please select your response\./i)).toBeInTheDocument();
        expect(getByText(/choice 1/i)).toBeInTheDocument();
        expect(getByText(/answer 1/i)).toBeInTheDocument();
    });

    test('enters edit mode and updates question text', () => {
        const { getByText, getByPlaceholderText } = render(
            <MatrixQuestion
                question={mockQuestion}
                index={0}
                onUpdate={mockUpdate}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={1}
                isEditable={true}
            />
        );

        // Enter edit mode
        fireEvent.click(getByText("Edit"));

        // Check if input fields are rendered in edit mode
        const questionTextInput = getByPlaceholderText("Enter question text...");
        expect(questionTextInput).toBeInTheDocument();
        expect(questionTextInput.value).toBe(mockQuestion.QuestionText);

        // Simulate changing the question text
        fireEvent.change(questionTextInput, { target: { value: "New Question Text" } });

        // Save the changes
        fireEvent.click(getByText("Save"));

        // Verify onUpdate was called with updated question text
        expect(mockUpdate).toHaveBeenCalledWith(0, expect.objectContaining({
            QuestionText: "New Question Text"
        }));
    });

    test('toggles required status of the question', () => {
        const { getByText, getByLabelText } = render(
            <MatrixQuestion
                question={mockQuestion}
                index={0}
                onUpdate={mockUpdate}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={1}
                isEditable={true}
            />
        );

        // Enter edit mode
        fireEvent.click(getByText("Edit"));

        // Toggle required checkbox
        const requiredCheckbox = getByLabelText("This question is required");
        fireEvent.click(requiredCheckbox);  // Switch ON

        // Save the changes
        fireEvent.click(getByText("Save"));

        // Verify onUpdate was called with ForceResponse set to 'ON'
        expect(mockUpdate).toHaveBeenCalledWith(0, expect.objectContaining({
            Validation: {
                Settings: expect.objectContaining({
                    ForceResponse: 'ON'
                })
            }
        }));
    });

    test('deletes a matrix question', () => {
        const { getByText } = render(
            <MatrixQuestion
                question={mockQuestion}
                index={0}
                onUpdate={mockUpdate}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={1}
                isEditable={true}
            />
        );

        // Delete the question
        fireEvent.click(getByText("Delete"));

        // Verify onDelete was called
        expect(mockDelete).toHaveBeenCalledWith(0);
    });

    test('rearranges a matrix question', () => {
        const { getByText } = render(
            <MatrixQuestion
                question={mockQuestion}
                index={0}
                onUpdate={mockUpdate}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={2}
                isEditable={true}
            />
        );

        // Click rearrange
        fireEvent.click(getByText("Rearrange"));

        // Check if Move Up/Move Down buttons are available
        expect(getByText("Move Down")).toBeInTheDocument();
        fireEvent.click(getByText("Move Down"));

        // Verify onMove was called with correct arguments
        expect(mockMove).toHaveBeenCalledWith(0, 'down');
    });

    test('should add new choice and answer', () => {
            render(
                <MatrixQuestion
                    question={mockQuestion}
                    index={0}
                    onUpdate={mockUpdate}
                    onDelete={mockDelete}
                    onMove={mockMove}
                    totalQuestions={1}
                    isEditable={true}
                />
            );

            fireEvent.click(screen.getByText('Edit'));

            // Add a new choice
            fireEvent.click(screen.getByText('Add Choice'));
            expect(screen.getAllByPlaceholderText(/Choice/).length).toBe(3);

            // Add a new answer
            fireEvent.click(screen.getByText('Add Answer'));
            expect(screen.getAllByPlaceholderText(/Answer/).length).toBe(3);
    });

    test('should save changes', () => {
            render(
                <MatrixQuestion
                    question={mockQuestion}
                    index={0}
                    onUpdate={mockUpdate}
                    onDelete={mockDelete}
                    onMove={mockMove}
                    totalQuestions={1}
                    isEditable={true}
                />
            );

            fireEvent.click(screen.getByText('Edit'));

            const questionTextInput = screen.getByPlaceholderText('Enter question text...');
            const questionDescriptionInput = screen.getByPlaceholderText('Enter question description...');

            // Change question text and description
            fireEvent.change(questionTextInput, { target: { value: 'Updated Question Text' } });
            fireEvent.change(questionDescriptionInput, { target: { value: 'Updated Question Description' } });

            // Save the changes
            fireEvent.click(screen.getByText('Save'));

            // Check if the mockOnUpdate callback was called with the updated data
            expect(mockUpdate).toHaveBeenCalledWith(0, expect.objectContaining({
                QuestionText: 'Updated Question Text',
                QuestionDescription: 'Updated Question Description',
            }));
        });
});
