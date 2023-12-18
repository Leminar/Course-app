import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import './EditCourse.css';

const EditCourse = () => {
  const { id } = useParams(); 
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

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching course data');
        }
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error('Error updating course');
      }
      navigate('/courses'); // Use navigate to navigate to the courses page
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="edit-course-container">
      <h1>Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Course Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="teacher">Teacher:</label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            value={courseData.teacher}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <input
            type="text"
            id="semester"
            name="semester"
            value={courseData.semester}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timing">Timing:</label>
          <input
            type="text"
            id="timing"
            name="timing"
            value={courseData.timing}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="classNumber">Class Number:</label>
          <input
            type="text"
            id="classNumber"
            name="classNumber"
            value={courseData.classNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isFull">Class Full:</label>
          <input
            type="checkbox"
            id="isFull"
            name="isFull"
            checked={courseData.isFull}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourse;
