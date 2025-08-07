import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // You can reuse your login styles
import './register.css';


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://flat-finder-qnkc.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert('Registration successful. You can now log in.');
        navigate('/login');
      } else {
        const data = await response.json();
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-clean">
      <div className="illustration">
        <i className="fa fa-user-plus"></i>
      </div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
        <button type="submit" className="btn-primary">Register</button>

        <div className="signup-link">
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
