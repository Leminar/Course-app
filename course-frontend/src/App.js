import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CoursesList from './components/CoursesList';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/edit-course/:id" element={<EditCourse />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
