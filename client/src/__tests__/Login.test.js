import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Mock useAuth and api
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('../services/api', () => ({
  post: jest.fn()
}));

describe('Login Component', () => {
  const mockLogin = jest.fn();
  window.alert = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ login: mockLogin });
  });

  it('should render the login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password:/i), { target: { value: 'testpassword' } });

    expect(screen.getByText(/Username:/i).value).toBe('testuser');
    expect(screen.getByText(/Password:/i).value).toBe('testpassword');
  });

  it('should handle successful login', async () => {
    api.post.mockResolvedValue({ data: { success: true, username: 'testuser' } });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password:/i), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser');
    });
  });

  it('should handle login failure', async () => {
    api.post.mockResolvedValue({ data: { success: false } });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password:/i), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Login failed");
    });
  });


  it('should handle Login error', async () => {
    api.post.mockRejectedValue(new Error('API error')); // Mock an error from the API

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password:/i), { target: { value: 'testpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('An error occurred during login');
    });
  });
});

