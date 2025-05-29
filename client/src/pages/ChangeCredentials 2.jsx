import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from '../services/api';
import { useNavigate } from "react-router-dom";

const ChangeCredentials2 = () => {  // Change the name here
    const { isAuthenticated, username, logout } = useAuth();
    const [newUsername, setNewUsername] = useState(username); // Prefill with current username
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);

        if (!newUsername || !newPassword) {
            setError('Please fill out both fields.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            const response = await api.put('/auth/update', {
                newUsername,
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
        <div className="form-container">
            <h2>Change Username and Password</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>New Username:</label>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="input"
                        disabled={loading} // Disable while loading
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
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

export default ChangeCredentials2; // Change the export name

