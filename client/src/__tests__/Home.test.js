import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home'; // Adjust the import based on your structure
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Mock useAuth and api
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('../services/api', () => ({
  post: jest.fn()
}));

describe('Home Component', () => {
  const mockUsername = 'testuser';
  const mockLogin = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ isAuthenticated: true, username: mockUsername, login: mockLogin });
  });

  it('should render the Home component', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Current user:/i)).toBeInTheDocument();
    expect(screen.getByText(`Current user: ${mockUsername}`)).toBeInTheDocument();
    expect(screen.getByText(/Survey Question Generation/i)).toBeInTheDocument();
  });

  it('should handle input changes in the form', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Using getByPlaceholderText instead of getByLabelText
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Question\/Topic... \(required\)/i), { target: { value: 'What is your name?' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Context... \(required\)/i), { target: { value: 'Personal Information' } });

    expect(screen.getByPlaceholderText(/Enter Research Question\/Topic... \(required\)/i).value).toBe('What is your name?');
    expect(screen.getByPlaceholderText(/Enter Research Context... \(required\)/i).value).toBe('Personal Information');
  });

  it('should submit the form and display the question section', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Simulate filling out the form
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Question\/Topic/i), {
        target: { value: 'AI' }
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter Hypothesis/i), {
        target: { value: 'AI will reduce the need for human labor.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Context/i), {
        target: { value: 'The increasing role of AI in the workforce.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Objectives\/Goals/i), {
        target: { value: 'To study the impact of AI on job markets.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Key Variables or Themes/i), {
        target: { value: 'AI, human labor, job market.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Demographic Information/i), {
        target: { value: 'Workers aged 25-45.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Expected Outcomes/i), {
        target: { value: 'Identify jobs that will be most affected by AI.' }
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check for question section content
    await waitFor(() => {
      // Adjust this line based on your component's actual output
      expect(screen.getByText(/Generate Question/i)).toBeInTheDocument(); // Make sure this matches the rendered text exactly
    });
  });


  it('should generate a question when "Generate Question" is clicked', async () => {

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Research Question\/Topic/i), {
        target: { value: 'AI' }
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter Hypothesis/i), {
        target: { value: 'AI will reduce the need for human labor.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Context/i), {
        target: { value: 'The increasing role of AI in the workforce.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Objectives\/Goals/i), {
        target: { value: 'To study the impact of AI on job markets.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Key Variables or Themes/i), {
        target: { value: 'AI, human labor, job market.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Demographic Information/i), {
        target: { value: 'Workers aged 25-45.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Expected Outcomes/i), {
        target: { value: 'Identify jobs that will be most affected by AI.' }
    });


    // Trigger form submission first
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Click the generate question button
    fireEvent.click(screen.getByRole('button', { name: /generate question/i }));

    await waitFor(() => {
      expect(screen.getByText(/generate/i)).toBeInTheDocument();
    });
  });

  it('should delete a question when "delete" is clicked', async () => {

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Research Question\/Topic/i), {
        target: { value: 'AI' }
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter Hypothesis/i), {
        target: { value: 'AI will reduce the need for human labor.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Context/i), {
        target: { value: 'The increasing role of AI in the workforce.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Objectives\/Goals/i), {
        target: { value: 'To study the impact of AI on job markets.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Key Variables or Themes/i), {
        target: { value: 'AI, human labor, job market.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Demographic Information/i), {
        target: { value: 'Workers aged 25-45.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Expected Outcomes/i), {
        target: { value: 'Identify jobs that will be most affected by AI.' }
    });


    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    fireEvent.click(screen.getByRole('button', { name: /generate question/i }));

    fireEvent.change(screen.getByTestId('question-type-generate'), { target: { value: 'mcq' } });

    fireEvent.click(screen.getByRole('button', { name: /generate/i }));

    await waitFor(() => {
      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
    });
  });

  it('should Create a question when "Create Question" is clicked', async () => {

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Research Question\/Topic/i), {
        target: { value: 'AI' }
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter Hypothesis/i), {
        target: { value: 'AI will reduce the need for human labor.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Context/i), {
        target: { value: 'The increasing role of AI in the workforce.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Objectives\/Goals/i), {
        target: { value: 'To study the impact of AI on job markets.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Key Variables or Themes/i), {
        target: { value: 'AI, human labor, job market.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Demographic Information/i), {
        target: { value: 'Workers aged 25-45.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Expected Outcomes/i), {
        target: { value: 'Identify jobs that will be most affected by AI.' }
    });


    // Trigger form submission first
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Click the generate question button
    fireEvent.click(screen.getByRole('button', { name: /generate question/i }));

    fireEvent.change(screen.getByTestId('question-type-generate'), { target: { value: 'mcq' } });

    fireEvent.click(screen.getByRole('button', { name: /generate/i }));

    await waitFor(() => {
      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
  });


  it('should add a question and publish', async () => {

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Trigger form submission first
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Question\/Topic/i), {
        target: { value: 'AI' }
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter Hypothesis/i), {
        target: { value: 'AI will reduce the need for human labor.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Context/i), {
        target: { value: 'The increasing role of AI in the workforce.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Research Objectives\/Goals/i), {
        target: { value: 'To study the impact of AI on job markets.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Key Variables or Themes/i), {
        target: { value: 'AI, human labor, job market.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Demographic Information/i), {
        target: { value: 'Workers aged 25-45.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Expected Outcomes/i), {
        target: { value: 'Identify jobs that will be most affected by AI.' }
    });


    // Trigger form submission first
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Click the generate question button
    fireEvent.click(screen.getByRole('button', { name: /create question/i }));

    fireEvent.change(screen.getByTestId('question-type-select'), { target: { value: 'mcq' } });

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
    });

    // Click the delete button (ensure your QuestionSection has a delete button for each question)
    fireEvent.click(screen.getByRole('button', { name: /add question/i }));

    // Check if the question is removed from the document
    expect(screen.getByText(/Generate Question/i)).toBeInTheDocument();


    fireEvent.click(screen.getByRole('button', { name: /Save Survey/i }));

    fireEvent.click(screen.getByRole('button', { name: /Publish Survey/i }));

    expect(screen.getByText(/Please name the survey/i)).toBeInTheDocument();
  });




  it('should hide generate buttons when handleGenerateQuestion is called', () => {
    render(<Home />); // Render your component

    // Assuming there are buttons initially rendered
    const generateButtons = screen.getByText(/submit/i); // Adjust the text based on your button labels

    expect(generateButtons).toBeVisible(); // Ensure the buttons are visible at the start

    // Find and click the button that triggers handleGenerateQuestion
    const triggerButton = screen.getByRole('button', { name: /submit/i }); // Adjust based on your trigger button
    fireEvent.click(triggerButton); // Simulate the click event to call handleGenerateQuestion

    // Check that the generate buttons are no longer visible
    expect(generateButtons).toBeVisible();
  });

});

