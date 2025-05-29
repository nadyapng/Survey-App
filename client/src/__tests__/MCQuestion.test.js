import { render, screen, fireEvent } from '@testing-library/react';
import MCQuestion from 'client/src/components/QuestionTypes/MCQuestion.jsx';
import React from 'react';

const setup = (propsOverrides = {}) => {
  const defaultProps = {
    question: {
      QuestionText: 'What is your favorite color?',
      QuestionDescription: 'Choose one',
      Choices: {
        1: { Display: 'Red' },
        2: { Display: 'Blue' },
      },
      Validation: {
        Settings: {
          ForceResponse: 'OFF',
        },
      },
    },
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
    onMove: jest.fn(),
    index: 0,
    totalQuestions: 2,
    isEditable: true,
  };
  const props = { ...defaultProps, ...propsOverrides };
  const utils = render(<MCQuestion {...props} />);
  return { props, utils };
};

describe('MCQuestion Component', () => {

  it('renders question text and description', () => {
    setup();

    expect(screen.getByText('What is your favorite color? (Type: Multi Choice)')).toBeInTheDocument();
    expect(screen.getByText('Choose one')).toBeInTheDocument();
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
  });

  it('displays "No question description" if no description is provided', () => {
    setup({ question: { QuestionText: 'What is your favorite color?', Choices: { 1: { Display: 'Red' }, 2: { Display: 'Blue' } } } });

    expect(screen.getByText('No question description')).toBeInTheDocument();
  });

  it('enters edit mode when the "Edit" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByPlaceholderText('Enter question text...')).toBeInTheDocument();
    expect(screen.getByDisplayValue('What is your favorite color?')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Choose one')).toBeInTheDocument();
  });

  it('allows editing question text and description', () => {
    const { props } = setup();

    fireEvent.click(screen.getByText('Edit'));

    fireEvent.change(screen.getByPlaceholderText('Enter question text...'), { target: { value: 'What is your favorite food?' } });
    fireEvent.change(screen.getByPlaceholderText('Enter question description...'), { target: { value: 'Pick your preferred food' } });

    fireEvent.click(screen.getByText('Save'));

    expect(props.onUpdate).toHaveBeenCalledWith(0, expect.objectContaining({
      QuestionText: 'What is your favorite food?',
      QuestionDescription: 'Pick your preferred food'
    }));
  });

  it('adds a new choice when "Add Choice" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Add Choice'));

    expect(screen.getAllByPlaceholderText(/Enter choice/).length).toBe(3); // 2 original choices + 1 added
  });

  it('deletes a choice when "Delete" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getAllByText('Delete')[0]); // delete the first choice

    expect(screen.queryByDisplayValue('Red')).not.toBeInTheDocument();
  });

  it('toggles the required checkbox', () => {
    const { props } = setup();

    fireEvent.click(screen.getByText('Edit'));

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    fireEvent.click(screen.getByText('Save'));

    expect(props.onUpdate).toHaveBeenCalledWith(0, expect.objectContaining({
      Validation: {
        Settings: {
          ForceResponse: 'ON',
        }
      }
    }));
  });

  it('calls onDelete when "Delete" button is clicked', () => {
    const { props } = setup();

    fireEvent.click(screen.getByText('Delete'));

    expect(props.onDelete).toHaveBeenCalledWith(0);
  });

  it('calls onMove when "Move Up" or "Move Down" is clicked', () => {
    const { props } = setup();

    fireEvent.click(screen.getByText('Rearrange'));
    fireEvent.click(screen.getByText('Move Down'));

    expect(props.onMove).toHaveBeenCalledWith(0, 'down');
  });
});