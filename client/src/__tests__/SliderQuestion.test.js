import { render, screen, fireEvent } from '@testing-library/react';
import SliderQuestion from 'client/src/components/QuestionTypes/SliderQuestion.jsx';
import React from 'react';

describe('SliderQuestion Component', () => {

  const mockQuestion = {
    QuestionText: 'What is your opinion on this?',
    QuestionDescription: 'Please provide your response by sliding.',
    Choices: {
      1: { Display: 'Move the slider to your answer' }
    },
    Validation: {
      Settings: {
        ForceResponse: 'OFF'
      }
    }
  };

  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();
  const mockMove = jest.fn();
  const index = 0;
  const totalQuestions = 1;

  test('renders slider question in view mode', () => {
    const { getByText, getByRole } = render(
      <SliderQuestion
        question={mockQuestion}
        onUpdate={mockUpdate}
        index={index}
        onDelete={mockDelete}
        onMove={mockMove}
        totalQuestions={totalQuestions}
        isEditable={true}
      />
    );

    // Verify the text is rendered in view mode
    expect(getByText('What is your opinion on this? (Type: Slider)')).toBeInTheDocument();
    expect(getByText('Please provide your response by sliding.')).toBeInTheDocument();

    // Verify the slider and its range
    const slider = getByRole('slider');
    expect(slider).toHaveAttribute('min', '1');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveValue('1');  // Updated initial value to match the default

    // Check that the force response is shown as 'No'
    expect(getByText('Required: No')).toBeInTheDocument();

    // Ensure the Edit button is present
    expect(getByText('Edit')).toBeInTheDocument();
  });

  test('allows editing the slider question', () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <SliderQuestion
        question={mockQuestion}
        onUpdate={mockUpdate}
        index={index}
        onDelete={mockDelete}
        onMove={mockMove}
        totalQuestions={totalQuestions}
        isEditable={true}
      />
    );

    // Enter edit mode
    fireEvent.click(getByText('Edit'));

    // Verify edit mode is activated by checking the placeholders
    const questionInput = getByPlaceholderText('Enter question text...');
    expect(questionInput).toHaveValue('What is your opinion on this?');

    const descriptionInput = getByPlaceholderText('Enter question description...');
    expect(descriptionInput).toHaveValue('Please provide your response by sliding.');

    // Change the min and max values
    const minInput = getByLabelText(/min value/i);
    const maxInput = getByLabelText(/max value/i);
    fireEvent.change(minInput, { target: { value: '10' } });
    fireEvent.change(maxInput, { target: { value: '50' } });
    expect(minInput).toHaveValue(10);
    expect(maxInput).toHaveValue(50);

    // Mark the question as required
    const requiredCheckbox = getByLabelText(/this question is required/i);
    fireEvent.click(requiredCheckbox);
    expect(requiredCheckbox).toBeChecked();

    // Save changes
    fireEvent.click(getByText('Save'));

    // Verify the mockUpdate function is called with updated data
    expect(mockUpdate).toHaveBeenCalledWith(index, expect.objectContaining({
      QuestionText: 'What is your opinion on this?',
      QuestionDescription: 'Please provide your response by sliding.',
      Choices: {
        '1': { Display: 'Move the slider to your answer' }
      },
      Validation: {
        Settings: {
          ForceResponse: 'ON'
        }
      }
    }));

    // Verify it returns to view mode
    expect(getByText('What is your opinion on this? (Type: Slider)')).toBeInTheDocument();
    expect(getByText('Required: Yes')).toBeInTheDocument(); // Shows required now
  });

  test('calls delete and move functions', () => {
    const { getByText } = render(
      <SliderQuestion
        question={mockQuestion}
        onUpdate={mockUpdate}
        index={index}
        onDelete={mockDelete}
        onMove={mockMove}
        totalQuestions={totalQuestions}
        isEditable={true}
      />
    );

    // Delete button
    fireEvent.click(getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith(index);

    // Rearrange mode for moving the question
    fireEvent.click(getByText('Rearrange'));
    fireEvent.click(getByText('Move Down'));
    expect(mockMove).toHaveBeenCalledWith(index, 'down');
  });


  test('should toggle rearrange mode and move the question', () => {
              render(
                  <SliderQuestion
                      question={mockQuestion}
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

  test('allows editing question text and description', () => {
      render(
        <SliderQuestion
          question={mockQuestion}
          index={0}
          onUpdate={mockUpdate}
          onDelete={mockDelete}
          onMove={mockMove}
          totalQuestions={1}
          isEditable={true}
        />
      );

      // Click "Edit" button
      fireEvent.click(screen.getByText('Edit'));

      // Ensure input fields are rendered
      const questionTextInput = screen.getByPlaceholderText('Enter question text...');
      const questionDescInput = screen.getByPlaceholderText('Enter question description...');

      // Change question text
      fireEvent.change(questionTextInput, { target: { value: 'New Question Text' } });
      fireEvent.change(questionDescInput, { target: { value: 'New Description' } });

      expect(questionTextInput.value).toBe('New Question Text');
      expect(questionDescInput.value).toBe('New Description');

      // Click "Save" button
      fireEvent.click(screen.getByText('Save'));

      // Expect mockUpdate to be called with the updated question
      expect(mockUpdate).toHaveBeenCalledWith(0, expect.objectContaining({
        QuestionText: 'New Question Text',
        QuestionDescription: 'New Description',
      }));
    });
});