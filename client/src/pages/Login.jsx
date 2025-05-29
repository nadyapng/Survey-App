import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from '../services/api';
import { useAuth } from "../context/AuthContext";
import React from 'react';
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login button clicked");

        try {
            const response = await api.post('/auth/login', {
                username,
                password
            });
            if (response.data.success) {
                console.log(response.data.username);
                login(username); // update auth context
                navigate('/');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error logging in: ', error);
            alert("An error occurred during login");
        }
    };

    return (
        <div className="page-container">
        <div className="login-background"></div>
            <div className="form-container-login">
                <form onSubmit={handleLogin} className="login-form">
                    <h2>LOGIN</h2>
                    <h3>Username</h3>
                    <div>
                        <label htmlFor="username"></label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-login"
                        />
                    </div>
                    <h3>Password</h3>
                    <div>
                        <label htmlFor="password"></label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-login"
                        />
                    </div>
                    <button className="submit-login">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
