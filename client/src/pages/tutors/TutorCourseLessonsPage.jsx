// TutorCourseLessonsPage.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonsByCourseId } from '../../features/lessons/LessonsThunks';

function TutorCourseLessonsPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const lessons  = useSelector((state) => state.lessons); // Get lessons from the store
  console.log(lessons);
  const BASE_URL = "http://localhost:3000/";

  useEffect(() => {
    dispatch(fetchLessonsByCourseId(courseId)); // Fetch lessons when the component mounts
  }, [dispatch, courseId]);

  const handleLessonClick = (lessonId) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`); // Navigate to the lesson content page
  };

  return (
    <div>
      <h2>Course Lessons</h2>
      <button onClick={() => navigate(`/courses/${courseId}/createlesson`)}>Create Lesson</button>
      <div className="lessons-container">
        {lessons.lessons?.map((lesson) => (
          <div key={lesson._id} className="lesson-card" onClick={() => handleLessonClick(lesson._id)}>
            <h3>{lesson.title}</h3>
            {/* Display a thumbnail or placeholder image */}
            {/* <img src={`${BASE_URL}${lesson.fileUrl}`} alt={lesson.title} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TutorCourseLessonsPage;



//**************************************************/

// // TutorCourseLessonsPage.jsx
// import React from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// function TutorCourseLessonsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { courseId } = useParams(); // Get courseId from URL parameters

//   const lessons = location.state?.lessons || []; // Use the lessons from the route state
//   const title = location.state?.title || '';
//   console.log('title:--', title);
//   const BASE_URL = "http://localhost:3000/";


//   // Function to handle click event for creating a new lesson
//   const handleCreateLessonClick = () => {
//     navigate(`/courses/${courseId}/createlesson`); // Navigate to the CreateLessons route
//   };

//   return (
//     <div>
//       <h2>{title} - Lessons</h2>
//       {lessons.map((lesson) => (
//         <div key={lesson._id}>
//           <h3>{lesson.title}</h3>
//           {/* Display video if URL is available */}
//           {lesson.content.media[0].url && (
//             <video controls width="250">
//               <source src={`${BASE_URL}${lesson.content.media[0].url}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//           {/* Add additional lesson content display here */}
//         </div>
//       ))}
//       <button onClick={handleCreateLessonClick}>Create Lesson</button> {/* Add this button */}
//     </div>
//   );
// }

// export default TutorCourseLessonsPage;
