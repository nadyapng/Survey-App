import { render, screen, fireEvent } from '@testing-library/react';
import TextEntryQuestion from 'client/src/components/QuestionTypes/TextEntryQuestion.jsx';
import React from 'react';

describe('TextEntryQuestion Component', () => {
    const mockUpdate = jest.fn();
    const mockDelete = jest.fn();
    const mockMove = jest.fn();
    const questionData = {
        QuestionText: 'Sample Question',
        QuestionDescription: 'Sample description',
        Validation: {
            Settings: {
                ForceResponse: 'ON'
            }
        }
    };
    const index = 0;
    const totalQuestions = 3;

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders question in view mode', () => {
        render(
            <TextEntryQuestion
                question={questionData}
                onUpdate={mockUpdate}
                index={index}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={totalQuestions}
                isEditable={true}
            />
        );

        expect(screen.getByText('Sample Question (Type: Text Entry)')).toBeInTheDocument();
        expect(screen.getByText('Question Description')).toBeInTheDocument();
        expect(screen.getByText('Sample description')).toBeInTheDocument();
        expect(screen.getByText('Required: Yes')).toBeInTheDocument();
    });

    test('enters edit mode and updates question', () => {
        render(
            <TextEntryQuestion
                question={questionData}
                onUpdate={mockUpdate}
                index={index}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={totalQuestions}
                isEditable={true}
            />
        );

        // Click edit button
        fireEvent.click(screen.getByText('Edit'));

        // Change question text and description
        const input = screen.getByPlaceholderText('Enter question text...');
        fireEvent.change(input, { target: { value: 'New Question Text' } });

        const textarea = screen.getByPlaceholderText('Enter question description...');
        fireEvent.change(textarea, { target: { value: 'New description' } });

        // Toggle required checkbox
        const checkbox = screen.getByLabelText('This question is required');
        fireEvent.click(checkbox);

        // Click save button
        fireEvent.click(screen.getByText('Save'));

        // Expect the update function to have been called with the new values
        expect(mockUpdate).toHaveBeenCalledWith(index, {
            ...questionData,
            QuestionText: 'New Question Text',
            QuestionDescription: 'New description',
            Validation: {
                Settings: {
                    ForceResponse: 'OFF' // The checkbox is now OFF
                }
            }
        });
    });

    test('can delete the question', () => {
        render(
            <TextEntryQuestion
                question={questionData}
                onUpdate={mockUpdate}
                index={index}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={totalQuestions}
                isEditable={true}
            />
        );

        // Click delete button
        fireEvent.click(screen.getByText('Delete'));

        // Expect the delete function to have been called with the correct index
        expect(mockDelete).toHaveBeenCalledWith(index);
    });

    test('can rearrange questions', () => {
        render(
            <TextEntryQuestion
                question={questionData}
                onUpdate={mockUpdate}
                index={index}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={totalQuestions}
                isEditable={true}
            />
        );

        // Click rearrange button
        fireEvent.click(screen.getByText('Rearrange'));

        // Click move up button
        fireEvent.click(screen.getByText('Move Up'));

        // Expect the move function to have been called with the correct parameters
        expect(mockMove).toHaveBeenCalledWith(index, 'up');

        // Click move down button
        fireEvent.click(screen.getByText('Move Down'));

        // Expect the move function to have been called with the correct parameters
        expect(mockMove).toHaveBeenCalledWith(index, 'down');
    });

      test('should toggle rearrange mode and move the question', () => {
                  render(
                      <TextEntryQuestion
                          question={questionData}
                          index={0}
                          onUpdate={mockUpdate}
                          onDelete={mockDelete}
                          onMove={mockMove}
                          totalQuestions={2} // Two questions for move up/down functionality
                          isEditable={true}
                      />
                  );

                  fireEvent.click(screen.getByText('Rearrange'));

                  // Check if rearrange buttons are rendered
                  expect(screen.getByText('Move Up')).toBeInTheDocument();
                  expect(screen.getByText('Move Down')).toBeInTheDocument();

                  // Click the "Move Down" button
                  fireEvent.click(screen.getByText('Move Down'));

                  // Check if the mockOnMove callback was called with the correct arguments
                  expect(mockMove).toHaveBeenCalledWith(0, 'down');

                  // Cancel rearrange mode
                  fireEvent.click(screen.getByText('Cancel'));

                  // Ensure rearrange buttons are not visible anymore
                  expect(screen.queryByText('Move Up')).not.toBeInTheDocument();
                  expect(screen.queryByText('Move Down')).not.toBeInTheDocument();
              });
});
