// LessonContentPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonById } from '../../features/lessons/LessonsThunks';

function LessonContentPage() {
  const { courseId, lessonId } = useParams();
  const dispatch = useDispatch();
  const { lesson } = useSelector((state) => state.lessons); // Get the lesson from the store
  const BASE_URL = "http://localhost:3000/";

  useEffect(() => {
    dispatch(fetchLessonById(lessonId)); // Fetch the lesson when the component mounts
  }, [dispatch, lessonId]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{lesson.title}</h2>
      <h3>{lesson.description}</h3>
      {/* Display video if available */}
      {lesson.content && lesson.content.media && lesson.content.media[0].url && (
        <video controls width="250">
          <source src={`${BASE_URL}${lesson.content.media[0].url}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <p>{lesson.description}</p>
      {/* Add additional lesson content display here */}
    </div>
  );
}

export default LessonContentPage;
