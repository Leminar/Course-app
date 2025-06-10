import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setCurrentUser }) => { 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }; 

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await fetch('http://localhost:5000/api/login', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.message);
        } else {
          console.log('Login successful');
          setCurrentUser(data.user); 
          navigate('/'); 
        }

      } catch (error) {
        console.error('Error:', error);
        setError('Error logging in');
      }
    };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
