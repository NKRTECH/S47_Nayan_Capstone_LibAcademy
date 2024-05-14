import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import LessonCard from '../../components/learner/LessonCard';
import { useSelector } from 'react-redux';

const LearnerCoursePage = () => {
    const learnerId = useSelector((state) => state.learner.learnerData?._id);
    const { courseId } = useParams();
    const location = useLocation();
    const course = location.state?.course;
    console.log('course:', course);
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null); // State for error handling
    const [isEnrolled, setIsEnrolled] = useState(false); // State to check if learner is enrolled

    const BASE_URL = 'http://localhost:3000/api';

    useEffect(() => {
      const fetchLessons = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/lessons/fetchLessonsByCourseId/${courseId}`, { learnerId });
          console.log('Lessons fetched successfully by courseId:', response.data);
          setLessons(response.data.lessons);
          setIsEnrolled(response.data.isEnrolled); // Set isEnrolled to true if the request is successful
          setError(null); // Reset error state if the request is successful
        } catch (error) {
          console.error('Error fetching lessons:', error.response?.data || error.message);
          setError(error.response?.data?.message || 'An error occurred while fetching lessons.');
          setIsEnrolled(false); // Set isEnrolled to false if there's an error
        }
      };
  
      fetchLessons();
    }, [courseId, learnerId]);

    return (
        <div>
            <h1>Lessons for {course?.title}</h1>
            <h3>Instructor:&nbsp; {`${course?.tutorId?.firstName} ${course?.tutorId?.lastName}`}</h3>
            {error && <p>error {error}</p>}
            {lessons?.map((lesson) => (
                <LessonCard 
                    key={lesson._id} 
                    lesson={lesson} 
                    isEnrolled={isEnrolled} 
                />
            ))}
        </div>
    );
};

export default LearnerCoursePage;
