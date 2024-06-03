// TutorLessonContentPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonById } from '../../features/lessons/LessonsThunks';
import './TutorLessonContentPage.css'; // Import the CSS file

function TutorLessonContentPage() {
  const { lessonId } = useParams();
  console.log('lessonId:--', lessonId);
  const dispatch = useDispatch();
  const { lesson, isLoading, error } = useSelector((state) => state.lessons); // Get the lesson from the store
  const FILE_URL = import.meta.env.VITE_FILE_URL;
  useEffect(() => {
    dispatch(fetchLessonById(lessonId)); // Fetch the lesson when the component mounts
  }, [dispatch, lessonId]);

  if (isLoading) {
    return <div className="lesson-content-container">Loading...</div>;
  }

  if (error) {
    return <div className="lesson-content-container">Error: {error.message}</div>;
  }

  if (!lesson) {
    return <div className="lesson-content-container">No lesson found</div>;
  }

  return (
    <div className="lesson-content-container">
      <h2 className="lesson-title">{lesson.title}</h2>
      {/* Display text content */}
      <p className="lesson-text">{lesson.content.text}</p>
      {/* Display video if available */}
      {lesson.content.media.map((mediaItem, index) => {
        if (mediaItem.type === 'video') {
          return (
            <div key={index} className="lesson-video-container">
              <div className="lesson-video-wrapper">
                <video className="lesson-video" controls>
                  <source src={`${FILE_URL}${mediaItem.url}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="lesson-video-description">{mediaItem.description}</p>
            </div>
          );
        }
        return null; // Or handle other media types if needed
      })}
      {/* Add additional lesson content display here */}
    </div>
  );
}

export default TutorLessonContentPage;




//************************************ */