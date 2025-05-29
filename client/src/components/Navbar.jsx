import { Link } from "react-router-dom";
import '../App.css'
import { useAuth } from "../context/AuthContext";
import './Navbar.css'


Link

const Navbar = () => {
    const { isAuthenticated, username, logout } = useAuth()

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <nav className="navbar">
            <ul className="nav-list">


                {isAuthenticated ? (
                    <>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/history" className="nav-link">History</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/DataVisualization" className="nav-link">Data</Link>
                        </li>

                        <div className="nav-right">

                            <li className="nav-item">
                                <span className="nav-link"> <Link to="/ChangeCredentials" className="nav-link">Welcome, {username}</Link></span>
                            </li>

                            <li className="nav-item">
                                <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
                            </li>
                        </div>

                        
                    </>
                ) : (
                    <>

                        <div className="nav-right">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </div>

                    </>
                )

                }




            </ul>
        </nav>
    );
}

export default Navbar