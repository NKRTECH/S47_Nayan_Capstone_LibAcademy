// TutorCoursePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesByTutor } from '../../features/courses/CoursesThunks';
import { useNavigate } from 'react-router-dom';
import './TutorCoursePage.css';
const BASE_URL = "http://localhost:3000/";

function TutorCoursePage() {
 const dispatch = useDispatch();
 const { tutorCourses } = useSelector((state) => state.courses);
 const { tutorData } = useSelector((state) => state.tutor);
 const navigate = useNavigate();

 useEffect(() => {
    if (tutorData) {
      dispatch(fetchCoursesByTutor(tutorData._id));
    }
 }, [dispatch, tutorData]);

 const handleCourseClick = (courseId) => {
    navigate(`/tutor/courses/${courseId}/lessons`); // Navigate to the lessons page for the course
 };

 return (
    <div>
      {tutorCourses.map((course) => (
        <div key={course._id} className="course-card" onClick={() => handleCourseClick(course._id)}>
          {course.fileUrl && <img src={`${BASE_URL}${course.fileUrl}`} alt={course.title} />}
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
      <button className="create-course-btn" onClick={() => navigate("/tutor/courses/create")}>Create Course</button>
    </div>
 );
}

export default TutorCoursePage;
