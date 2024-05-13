// LearnerCoursePage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LessonCard from '../../components/learner/LessonCard';

const LearnerCoursePage = () => {
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null); // State for error handling

    const BASE_URL = 'http://localhost:3000/api';

    useEffect(() => {
      const fetchLessons = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/lessons/fetchLessonsByCourseId/${courseId}`);
          console.log('Lessons fetched successfully by courseId:', response.data);
          setLessons(response.data.lessons);
          setError(null); // Reset error state if the request is successful
        } catch (error) {
          console.error('Error fetching lessons:', error.response?.data || error.message);
          setError(error.response?.data?.message || 'An error occurred while fetching lessons.');
        }
      };
  
      fetchLessons();
    }, [courseId]);

    return (
        <div>
            <h1>Lessons for {lessons[0]?.courseId?.title}</h1>
            <h3>Instructor:&nbsp; {`${lessons[0]?.tutorId?.firstName} ${lessons[0]?.tutorId?.lastName}`}</h3>
            {error && <p>{error}</p>}
            {lessons?.map((lesson) => (
                <LessonCard key={lesson._id} lesson={lesson} />
            ))}
        </div>
    );
};

export default LearnerCoursePage;