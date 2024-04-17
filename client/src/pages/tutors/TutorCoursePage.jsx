import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesByTutor } from '../../features/courses/CoursesThunks';
import { useNavigate } from 'react-router-dom';
import './TutorCoursePage.css'; // Import the CSS file
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

 const handleCourseClick = (course) => {
    navigate(`/courses/${course._id}`, {
      state: { 
        lessons: course.lessonIds,
        title: course.title
      }
    });
 };

 return (
    <div>
      {tutorCourses.map((course) => (
        <div key={course._id} className="course-card" onClick={() => handleCourseClick(course)}>
          {course.fileUrl && <img src={`${BASE_URL}${course.fileUrl}`} alt={course.title} />}
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
      <button className="create-course-btn" onClick={() => navigate("/courses/create")}>Create Course</button>
    </div>
 );
}

export default TutorCoursePage;



//************************************* */

// import React from 'react'
// import { Link } from 'react-router-dom'

// function TutorCoursePage() {
//   return (
//     <>
//     <Link to={"/courses/create"}><button>Create Course</button></Link>
//     </>
//   )
// }

// export default TutorCoursePage