import React from 'react';

import {
    createContext,
    useContext,
    useState,
} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState('')

    const login = (user) => {
        setIsAuthenticated(true)
        setUsername(user)
    }
    const logout = () => {
        setIsAuthenticated(false)
        setUsername('')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)