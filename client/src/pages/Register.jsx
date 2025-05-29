import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api'
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Register button clicked")
        try {
            const response = await api.post('/auth/register', {
                username,
                password
            })
            if (response.data.success) {
                alert('Registration successful')
                navigate('/login')
            } else {
                alert('Registration failed')
            }
        } catch (error) {
            console.error('Error registering: ', error)
            alert("An error occurred during registration")
        }
    }

    return (
            <div className="page-container">
            <div className="login-background"></div>
        <div className="form-container-login">
            <form onSubmit={handleRegister} className="login-form">
            <h2>REGISTER</h2>
                <h3>Username</h3>
                <div>
                    <label for="username"></label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-login"
                        id="username"
                    />
                </div>
                <h3>Password</h3>
                <div>
                    <label for="password"></label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-login"
                        id="password"
                    />
                </div>
                <button className="submit-login">Register</button>
            </form>
        </div>
        </div>
    )
}

export default Register