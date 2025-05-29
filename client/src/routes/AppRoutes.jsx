import {
    Routes, Route
} from 'react-router-dom'

import Home from '../pages/Home'
import History from '../pages/History';
import About from '../pages/About'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PrivateRoute from '../components/Login/PrivateRoute'
import { ChangeCredentials } from '../pages/ChangeCredentials';
import DataVisualization from '../pages/DataVisualization.jsx';


const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            {/* <Route
                path="/about"
                element={
                    <PrivateRoute>
                        <About />
                    </PrivateRoute>
                }
            />
            <Route
                path="/contact"
                element={
                    <PrivateRoute>
                        <Contact />
                    </PrivateRoute>
                }
            /> */}
            <Route
                path="/ChangeCredentials"
                element={
                    <PrivateRoute>
                        <ChangeCredentials />
                    </PrivateRoute>
                }
            />

            <Route
                path="/history"
                element={
                    <PrivateRoute>
                        <History />
                    </PrivateRoute>
                }
            />

            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/ChangeCredential" element={<ChangeCredentials />}/>
            <Route path="/DataVisualization" element={<DataVisualization />}/>
        </Routes>
    )
}

export default AppRoutes