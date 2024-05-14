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
    const [enrolledLearners, setEnrolledLearners] = useState([]);
    const [error, setError] = useState(null); // State for error handling

    const BASE_URL = 'http://localhost:3000/api';

    useEffect(() => {
      const fetchLessons = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/lessons/fetchLessonsByCourseId/${courseId}`);
          console.log('Lessons fetched successfully by courseId:', response.data);
          setLessons(response.data.lessons);
          setEnrolledLearners(response.data.enrolledLearners);
          setError(null); // Reset error state if the request is successful
        } catch (error) {
          console.error('Error fetching lessons:', error.response?.data || error.message);
          setError(error.response?.data?.message || 'An error occurred while fetching lessons.');
        }
      };
  
      fetchLessons();
    }, [courseId]);

    const currentLearnerId = learnerId; // Replace this with the actual learner ID from your auth system

    return (
        <div>
            <h1>Lessons for {lessons[0]?.courseId?.title}</h1>
            <h3>Instructor:&nbsp; {`${course?.tutorId?.firstName} ${course?.tutorId?.lastName}`}</h3>
            {error && <p>{error}</p>}
            {lessons?.map((lesson) => (
                <LessonCard 
                    key={lesson._id} 
                    lesson={lesson} 
                    currentLearnerId={currentLearnerId} 
                    enrolledLearners={enrolledLearners} 
                />
            ))}
        </div>
    );
};

export default LearnerCoursePage;
