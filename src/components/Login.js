import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://backend-2h1i.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the auth token and redirectS
            localStorage.setItem('token', json.authToken);
            props.showAlert("success", "Logged in successfully");
            navigate('/');
        } 
        else {
            props.showAlert("danger", "Invalid Credential");
        }
    }
    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
        else {
            console.log("object");
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className='container my-4'>
            <h1 className='my-4'>Login into iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credential.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credential.password} className="form-control" id="password" name="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login