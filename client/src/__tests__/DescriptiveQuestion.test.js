import { render, screen, fireEvent } from '@testing-library/react';
import DescriptiveQuestion from 'client/src/components/QuestionTypes/DescriptiveQuestion.jsx';
import React from 'react';

describe('DescriptiveQuestion Component', () => {
    const mockUpdate = jest.fn();
    const mockDelete = jest.fn();
    const mockMove = jest.fn();
    const questionData = {
        QuestionText: 'Sample Question',
        QuestionDescription: 'Sample description'
    };
    const index = 0;
    const totalQuestions = 3;

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders question in view mode', () => {
        render(
            <DescriptiveQuestion
                question={questionData}
                onUpdate={mockUpdate}
                index={index}
                onDelete={mockDelete}
                onMove={mockMove}
                totalQuestions={totalQuestions}
                isEditable={true}
            />
        );

        expect(screen.getByText('Sample Question (Type: Descriptive)')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Sample description')).toBeInTheDocument();
    });

    test('enters edit mode and updates question', () => {
        render(
            <DescriptiveQuestion
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
        const input = screen.getByPlaceholderText('Enter title...');
        fireEvent.change(input, { target: { value: 'New Question Text' } });

        const textarea = screen.getByPlaceholderText('Enter description...');
        fireEvent.change(textarea, { target: { value: 'New description' } });

        // Click save button
        fireEvent.click(screen.getByText('Save'));

        // Expect the update function to have been called with the new values
        expect(mockUpdate).toHaveBeenCalledWith(index, {
            ...questionData,
            QuestionText: 'New Question Text',
            QuestionDescription: 'New description'
        });
    });

    test('can delete the question', () => {
        render(
            <DescriptiveQuestion
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

    test('should toggle rearrange mode and move the question', () => {
            render(
                <DescriptiveQuestion
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

    test('cancels rearranging', () => {
        render(
            <DescriptiveQuestion
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

        // Click cancel button
        fireEvent.click(screen.getByText('Cancel'));

        // Expect rearrange mode to be canceled
        expect(screen.getByText('Rearrange')).toBeInTheDocument();
    });

    test('should toggle rearrange mode and move the question', () => {
            render(
                <DescriptiveQuestion
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
            fireEvent.click(screen.getByText('Move Up'));

            // Check if the mockOnMove callback was called with the correct arguments
            expect(mockMove).toHaveBeenCalledWith(0, 'up');

            // Cancel rearrange mode
            fireEvent.click(screen.getByText('Cancel'));

            // Ensure rearrange buttons are not visible anymore
            expect(screen.queryByText('Move Up')).not.toBeInTheDocument();
            expect(screen.queryByText('Move Down')).not.toBeInTheDocument();
        });
});