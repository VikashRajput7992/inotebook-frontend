import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credential, setCredential] = useState({ name: "", email: "", password: "" });
  let nevigator = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://backend-2h1i.onrender.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name:credential.name, email: credential.email, password: credential.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token',json.authToken);
      nevigator('/');
      props.showAlert("success","Account created successfully");
    }
    else{
      props.showAlert("danger","Invalid Details");
    }
  }
  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div className='Container mt-4'>
        <h1 className='my-4'>Create a New Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" value={credential.name} className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={handleChange} minLength={3} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" value={credential.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={credential.password} className="form-control" id="password" name="password" onChange={handleChange} minLength={5} required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup