import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom'; 
import axios from 'axios';
import './styles/signup.css'; 
// const navigate=Navigate();
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password,
        username
      });
      // console.log("SSS");
        navigate('/signin');
      // console.log(response.data);
      console.log(response.data); 
    } catch (error) {
      setError(error.message); 
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
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      
      <button type="submit">Sign Up</button>
      <p>Already registered? <Link to="/signin">Login</Link></p>
    </form>
  );
};

export default Signup;
