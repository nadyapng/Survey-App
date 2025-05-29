import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';
import api from '../services/api';

// Mock the api service
jest.mock('../services/api', () => ({
  post: jest.fn()
}));

describe('Register Component', () => {
  window.alert = jest.fn(); // Mock window.alert

  it('should render the registration form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Simulate typing into the input fields
    fireEvent.change(screen.getByPlaceholderText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password:/i), { target: { value: 'testpassword' } });

    // Assert that the input values have changed
    expect(screen.getByText(/Username:/i).value).toBe('testuser');
    expect(screen.getByText(/Password:/i).value).toBe('testpassword');
  });

  it('should handle successful registration', async () => {
    api.post.mockResolvedValue({ data: { success: true } }); // Mock a successful API response

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password:/i), { target: { value: 'testpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Registration successful');
    });
  });

  it('should handle failed registration', async () => {
    api.post.mockResolvedValue({ data: { success: false } }); // Mock a failed API response

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password:/i), { target: { value: 'testpassword' } });
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Registration failed');
    });
  });

  it('should handle registration error', async () => {
    api.post.mockRejectedValue(new Error('API error')); // Mock an error from the API

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password:/i), { target: { value: 'testpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('An error occurred during registration');
    });
  });
});
