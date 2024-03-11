import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import axios from 'axios';
import './styles/signup.css'; // Import signup.css

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send sign-up request to backend
      const response = await axios.post('https://meal-app-client.vercel.app/signup', {
        email,
        password,
        username
      });

      // If sign-up is successful, handle the response accordingly
      console.log(response.data); // Log response from backend
    } catch (error) {
      setError(error.message); // Set error state if request fails
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <button type="submit">Sign Up</button>
      {/* Link to login page */}
      <p>Already registered? <Link to="/signin">Login</Link></p>
    </form>
  );
};

export default Signup;
