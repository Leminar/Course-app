import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    fetch('/api/logout', { method: 'POST' })
      .then(() => {
        setCurrentUser(null); // User is logged out, reset the current user state
      })
      .catch(err => console.error('Logout failed:', err));
  };

  return (
    <div className="home-page-container">
      <header className="home-header">
        <h1>Welcome to the Courses App</h1>
        {currentUser ? (
          <>
            <p>Logged in as: {currentUser.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <nav className="home-nav">
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </nav>
        )}
      </header>
      <nav className="home-nav">
        <ul>
          <li><Link to="/courses">View Courses</Link></li>
          {currentUser && (
            <>
              <li><Link to="/addcourse">Add New Course</Link></li>
              <li>Hello, {currentUser.username}</li>
            </>
          )}
        </ul>
      </nav>
      {/* Additional content can be added here */}
    </div>
  );
};

export default HomePage;
