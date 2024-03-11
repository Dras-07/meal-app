import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useHistory
import axios from 'axios';
import './styles/signin.css'; // Import signup.css

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send sign-in request to backend
      const response = await axios.post('http://localhost:5000/signin', {
        email,
        password,
      });

      // Check if the response contains the expected structure
      if (!response.data || !response.data.user || !response.data.user.session || !response.data.user.session.access_token) {
        throw new Error('Invalid response data');
      }

      // If sign-in is successful, save the token in local storage
      const { access_token } = response.data.user.session;
      const { id } =       response.data.user.user;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('userId',id);

      // Redirect to dashboard route
      console.log(access_token);
      console.log(response.data); // Log response from backend
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      setError(error.message || 'Sign-in failed'); // Set error state if request fails
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign In</button>
      {/* Link to sign-up page */}
      <p>Not registered? <Link to="/signup">Sign Up</Link></p>
    </form>
  );
};

export default SignInForm;
