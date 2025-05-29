import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from '../services/api';
import { useNavigate } from "react-router-dom";
import React from 'react';
import './Login.css'

export const ChangeCredentials = () => {
    const { isAuthenticated, username, logout } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);

        if (!newPassword) {
            setError('Please enter a new password.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/auth/ChangeCredentials', {
                newUsername: username,  // Keep the original username, don't let them change it
                newPassword
            });

            if (response.data.success) {
                alert('Credentials updated successfully');
                navigate('/'); // Redirect to home or some other page
            } else {
                setError(response.data.message || 'Failed to update credentials.');
            }
        } catch (error) {
            console.error('Error updating credentials:', error);
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container-login">
            <h2>Change Password</h2>
            <form onSubmit={handleUpdate} className="login-form">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        className="input"
                        readOnly // Make the username field read-only
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input"
                        disabled={loading} // Disable while loading
                    />
                </div>
                {error && <p className="error">{error}</p>} {/* Display any errors */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Credentials'}
                </button>
            </form>
        </div>
    );
};
