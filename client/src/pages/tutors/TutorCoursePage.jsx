// TutorCoursePage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesByTutor } from '../../features/courses/CoursesThunks';
import { useNavigate } from 'react-router-dom';
import styles from './TutorCoursePage.module.css';
import CourseCard from '../../components/course/CourseCard';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api';


function TutorCoursePage() {
  // const dispatch = useDispatch();
  // const { tutorCourses } = useSelector((state) => state.courses);
  const [tutorCourses, setTutorCourses] = useState([]);
  const { tutorData } = useSelector((state) => state.tutor);
  const [error, setError] = useState(null); // State to hold the error message
  const navigate = useNavigate();

  useEffect(() => {
    if (tutorData) {
      // dispatch(fetchCoursesByTutor(tutorData._id));
      const fetchCoursesByTutor = async () => {
        try{
          const response = await axios.get(`${BASE_URL}/courses/fetchCoursesByTutor/${tutorData._id}`);
          console.log('response:--',response)
          setTutorCourses(response.data.courses);
          setError(null); // Clear any previous error
        } catch(error) {
          console.error('Error fetching courses:', error);
          setError(error.response.data.message); // Set the error message
        }
      }
      fetchCoursesByTutor();
    }
  }, [tutorData]);

  useEffect(() => {
    console.log('Tutor courses:', tutorCourses); // Log the tutorCourses data
  }, [tutorCourses]);

  const handleCourseClick = (courseId) => {
    navigate(`/tutor/courses/${courseId}/lessons`); // Navigate to the lessons page for the course
  };

  return (
    <div>
      <button className={styles.createCourseBtn} onClick={() => navigate("/tutor/courses/create")}>Create Course</button>
      {error && <div className={styles.error}>{error}</div>} {/* Display the error message */}
      <div className={styles.courseCardContainer}> {/* Use module-based class name */}
        {tutorCourses.map((course) => (
          <div key={course._id} className={styles.courseCardWrapper} onClick={() => handleCourseClick(course._id)}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TutorCoursePage;
