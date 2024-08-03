import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';

const Navbar = (prop) => {
    const context = useContext(noteContext);
    const { mode, handleToggle } = context;
    const toggleSwitch = () => {
        handleToggle();
    }
    const [logged, setLogged] = useState(null);
    const navigate = useNavigate();
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogged(Math.random());
        prop.showAlert("success","Logout Successfully");
    }
    useEffect(() => {
        navigate("/login");
        // eslint-disable-next-line
    }, [logged]);
    useEffect(() => {
        if (localStorage.getItem('dark') === 'true') {
            handleToggle();
        }
        // eslint-disable-next-line
    }, [])
    return (
        <nav className={`navbar navbar-expand-lg ${mode === 'light' ? 'bg-body-tertiary' : 'navbar-dark bg-dark'}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleSwitch} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                    </div>
                    <form className="d-flex">
                        {localStorage.getItem('token') ? <Link className="btn btn-outline-primary mx-1" onClick={handleLogout} role="button">LogOut</Link> : <div>
                            <Link className="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-outline-primary mx-1" to="/signup" role="button">Signup</Link>
                        </div>}
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar