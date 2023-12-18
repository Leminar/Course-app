import React, { useState, useEffect } from 'react';
import './CourseList.css';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (e) {
        setError(e.message);
        console.error("Error fetching courses:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Error deleting the course');
        }
        // Remove the course from the state
        setCourses(courses.filter(course => course._id !== id));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleEdit = (id) => {
    // Assuming you have a route like '/edit-course/:id'
    window.location.href = `/edit-course/${id}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Courses List</h1>
      <div className="course-list">
        {courses.map(course => (
          <div key={course._id} className="course-item">
            <h2>{course.name}</h2>
            <p><strong>Teacher:</strong> {course.teacher}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Semester:</strong> {course.semester}</p>
            <p><strong>Timing:</strong> {course.timing}</p>
            <p><strong>Class Number:</strong> {course.classNumber}</p>
            <p>{course.isFull ? "Class is full" : "Spots available"}</p>
            <div className="buttons">
              <button onClick={() => handleEdit(course._id)}>Edit</button>
              <button onClick={() => handleDelete(course._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
