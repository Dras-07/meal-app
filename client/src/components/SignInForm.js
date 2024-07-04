import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './styles/signin.css'; 

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:5000/signin', {
        email,
        password,
      });

      if (!response.data || !response.data.user || !response.data.user.session || !response.data.user.session.access_token) {
        throw new Error('Invalid response data');
      }

      const { access_token } = response.data.user.session;
      const { id } =       response.data.user.user;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('userId',id);

      console.log(access_token);
      console.log(response.data); 
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Sign-in failed'); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Sign In</h2>
      {error && <p>Invalid Credentials</p>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign In</button>
      <p>Not registered? <Link to="/signup">Sign Up</Link></p>
    </form>
  );
};

export default SignInForm;
