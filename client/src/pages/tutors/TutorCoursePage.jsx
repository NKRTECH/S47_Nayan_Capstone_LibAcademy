// TutorCoursePage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesByTutor } from '../../features/courses/CoursesThunks';
import { useNavigate } from 'react-router-dom';
import styles from './TutorCoursePage.module.css';
import CourseCard from '../../components/course/CourseCard';

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

  useEffect(() => {
    console.log('Tutor courses:', tutorCourses); // Log the tutorCourses data
  }, [tutorCourses]);

  const handleCourseClick = (courseId) => {
    navigate(`/tutor/courses/${courseId}/lessons`); // Navigate to the lessons page for the course
  };

  return (
    <div>
      <button className={styles.createCourseBtn} onClick={() => navigate("/tutor/courses/create")}>Create Course</button>
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
