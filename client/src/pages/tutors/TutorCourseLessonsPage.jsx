// TutorCourseLessonsPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './TutorCourseLessonsPage.css';

function TutorCourseLessonsPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const BASE_URL = 'http://localhost:3000/api';

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lessons/fetchLessonsByCourseId/${courseId}`);
        console.log('Lessons fetched successfully by courseId:', response.data);
        setLessons(response.data);
        setError(null); // Reset error state if the request is successful
      } catch (error) {
        console.error('Error fetching lessons:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'An error occurred while fetching lessons.');
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleLessonClick = (lessonId) => {
    navigate(`/tutor/courses/${courseId}/lessons/${lessonId}`);
  };

  const handleEditClick = (event, lessonId) => {
    event.stopPropagation();
    navigate(`/tutor/courses/${courseId}/lessons/edit/${lessonId}`);
  };

  return (
    <div>
      <h2>Course Lessons</h2>
      <button className="create-lesson-btn" onClick={() => navigate(`/tutor/courses/${courseId}/createlesson`)}>Create Lesson</button>
      {error && <div className="error-message">{error}</div>} {/* Display the error message */}
      <div className="lessons-container">
        {lessons.lessons?.map((lesson) => (
          <div key={lesson._id} className="lesson-card" onClick={() => handleLessonClick(lesson._id)}>
            <h3>{lesson.title}</h3>
            {/* Display a thumbnail or placeholder image */}
            {/* <img src={`${BASE_URL}${lesson.fileUrl}`} alt={lesson.title} /> */}
            <button onClick={(event) => handleEditClick(event, lesson._id)}>
                Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TutorCourseLessonsPage;



//************************************************* */

// import { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLessonsByCourseId } from '../../features/lessons/LessonsThunks';
// import './TutorCourseLessonsPage.css';

// function TutorCourseLessonsPage() {
//   const navigate = useNavigate();
//   const { courseId } = useParams();
//   const dispatch = useDispatch();
//   const lessons = useSelector((state) => state.lessons); // Get lessons from the store
//   console.log(lessons);
//   const BASE_URL = "http://localhost:3000/";

//   useEffect(() => {
//     dispatch(fetchLessonsByCourseId(courseId)); // Fetch lessons when the component mounts
//   }, [dispatch, courseId]);

//   const handleLessonClick = (lessonId) => {
//     navigate(`/tutor/courses/${courseId}/lessons/${lessonId}`); // Navigate to the lesson content page
//   };

//   const handleEditClick = (event, lessonId) => {
//     event.stopPropagation(); // Prevent the event from bubbling up to the parent
//     navigate(`/tutor/courses/${courseId}/lessons/edit/${lessonId}`); // Navigate to the edit page
//   };

//   return (
//     <div>
//       <h2>Course Lessons</h2>
//       <button className="create-lesson-btn" onClick={() => navigate(`/tutor/courses/${courseId}/createlesson`)}>Create Lesson</button>
//       <div className="lessons-container">
//         {lessons.lessons?.map((lesson) => (
//           <div key={lesson._id} className="lesson-card" onClick={() => handleLessonClick(lesson._id)}>
//             <h3>{lesson.title}</h3>
//             {/* Display a thumbnail or placeholder image */}
//             {/* <img src={`${BASE_URL}${lesson.fileUrl}`} alt={lesson.title} /> */}
//             <button onClick={(event) => handleEditClick(event, lesson._id)}>
//                 Edit
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TutorCourseLessonsPage;
