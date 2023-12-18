import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCourse.css'; 

const AddCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: '',
    teacher: '',
    description: '',
    semester: '',
    timing: '',
    classNumber: '',
    isFull: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error('Network error when attempting to add course');
      }
      setCourseData({ name: '', teacher: '', description: '', semester: '', timing: '', classNumber: '', isFull: false });
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-course-container">
      <h1>Add a New Course</h1>
      <form onSubmit={handleSubmit} className="add-course-form">
        <label htmlFor="name">Course Name:</label>
        <input type="text" id="name" name="name" value={courseData.name} onChange={handleChange} required />

        <label htmlFor="teacher">Teacher:</label>
        <input type="text" id="teacher" name="teacher" value={courseData.teacher} onChange={handleChange} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={courseData.description} onChange={handleChange} required />

        <label htmlFor="semester">Semester::</label>
        <input type="text" id="semester" name="semester" value={courseData.semester} onChange={handleChange} required />

        <label htmlFor="timing">Timing:</label>
        <input type="text" id="timing" name="timing" value={courseData.timing} onChange={handleChange} required />

        <label htmlFor="classNumber">Class Number:</label>
        <input type="text" id="classNumber" name="classNumber" value={courseData.classNumber} onChange={handleChange} required />

        <label htmlFor="isFull">Class Full:</label>
        <input type="checkbox" id="isFull" name="isFull" checked={courseData.isFull} onChange={handleChange} />

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
