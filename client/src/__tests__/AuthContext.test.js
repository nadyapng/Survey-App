import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from 'client/src/context/AuthContext.jsx';
import React from 'react';
import { fireEvent } from '@testing-library/react';

// Mock component to consume the AuthContext
const MockComponent = () => {
    const { isAuthenticated, username, login, logout } = useAuth();

    return (
        <div>
            <div>
                <span>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</span>
                <span>Username: {username}</span>
            </div>
            <button onClick={() => login('testuser')}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('AuthContext', () => {
    it('should have default values (not authenticated and no username)', () => {
        render(
            <AuthProvider>
                <MockComponent />
            </AuthProvider>
        );

        // Check default values
        expect(screen.getByText(/Authenticated: No/i)).toBeTruthy();
        expect(screen.getByText(/Username:/i)).toHaveTextContent('Username:');
    });

    it('should update authentication state and username when login is called', () => {
        render(
            <AuthProvider>
                <MockComponent />
            </AuthProvider>
        );

        const loginButton = screen.getByText(/Login/i);

        // Simulate login action
        fireEvent.click(loginButton);

        // Check that authentication state and username are updated
        expect(screen.getByText(/Authenticated: Yes/i)).toBeTruthy();
        expect(screen.getByText(/Username: testuser/i)).toBeTruthy();
    });

    it('should reset authentication state and username when logout is called', () => {
        render(
            <AuthProvider>
                <MockComponent />
            </AuthProvider>
        );

        const loginButton = screen.getByText(/Login/i);
        const logoutButton = screen.getByText(/Logout/i);

        // Simulate login action first
        fireEvent.click(loginButton);

        // Simulate logout action
        fireEvent.click(logoutButton);

        // Check that authentication state and username are reset
        expect(screen.getByText(/Authenticated: No/i)).toBeTruthy();
        expect(screen.getByText(/Username:/i)).toHaveTextContent('Username:');
    });
});
