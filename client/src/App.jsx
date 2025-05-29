import { useState } from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'

import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
