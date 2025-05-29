import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ChangeCredentials } from '../pages/ChangeCredentials';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Mock the necessary modules
jest.mock('../context/AuthContext');
jest.mock('../services/api');

describe('ChangeCredentials Component', () => {
    // Mock the `useAuth` function
    beforeEach(() => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            username: 'testuser',
            logout: jest.fn(),
        });
    });

    it('should render ChangeCredentials form correctly', () => {
        render(
            <BrowserRouter>
                <ChangeCredentials />
            </BrowserRouter>
        );

        // Check if the form elements are rendered
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
        expect(screen.getByText(/update credentials/i)).toBeInTheDocument();
    });

    it('should display error when password is not provided', async () => {
        render(
            <BrowserRouter>
                <ChangeCredentials />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/update credentials/i));

        // Check for the error message
        expect(await screen.findByText(/please enter a new password/i)).toBeInTheDocument();
    });

    it('should display error if password is less than 6 characters', async () => {
        render(
            <BrowserRouter>
                <ChangeCredentials />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/new password/i), {
            target: { value: '123' }, // Simulate a short password
        });

        fireEvent.click(screen.getByText(/update credentials/i));

        // Check for the error message
        expect(await screen.findByText(/password must be at least 6 characters long/i)).toBeInTheDocument();
    });

    it('should call API and navigate on successful credentials update', async () => {
        // Mock a successful API response
        api.post.mockResolvedValue({ data: { success: true } });

        render(
            <BrowserRouter>
                <ChangeCredentials />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/new password/i), {
            target: { value: 'newsecurepassword' }, // Provide a valid password
        });

        fireEvent.click(screen.getByText(/update credentials/i));

        // Wait for the API call to complete
        await waitFor(() => expect(api.post).toHaveBeenCalledWith('/auth/ChangeCredentials', {
            newUsername: 'testuser',
            newPassword: 'newsecurepassword'
        }));

        // Wait for the button to change back to "Update Credentials" after loading is complete
        await waitFor(() => expect(screen.getByText(/update credentials/i)).toBeEnabled());
    });

    it('should display error if API call fails', async () => {
        // Mock a failed API response
        api.post.mockRejectedValue(new Error('Failed to update credentials'));

        render(
            <BrowserRouter>
                <ChangeCredentials />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/new password/i), {
            target: { value: 'validpassword123' }, // Provide a valid password
        });

        fireEvent.click(screen.getByText(/update credentials/i));

        // Wait for the API call to complete
        await waitFor(() => expect(api.post).toHaveBeenCalled());

        // Check for the error message
        expect(await screen.findByText(/an error occurred. please try again later/i)).toBeInTheDocument();
    });
});
