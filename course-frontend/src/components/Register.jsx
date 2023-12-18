import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        if (response.headers.get("content-type").includes("application/json")) {
          const data = await response.json();
          setError(data.message);
        } else {
          setError('Server error');
        }
      } else {
        console.log('Registration successful, navigating to login');
        navigate('/login'); // Ensure this matches the exact route path
        setFormData({ username : '', password: ''});
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed');
      console.log('Registration failed');
    }
  };
  
  

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
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

        <button type="submit">Register</button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
