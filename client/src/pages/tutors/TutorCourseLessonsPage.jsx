// TutorCourseLessonsPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

function TutorCourseLessonsPage() {
  const location = useLocation();
  const lessons = location.state?.lessons || []; // Use the lessons from the route state
  const title = location.state?.title || '';
  console.log('title:--',title);

  return (
    <div>
      <h2>Lessons</h2>
      {lessons.map((lesson) => (
        <div key={lesson._id}>
          <h3>{lesson.title}</h3>
          <p>{lesson.content.text}</p>
          {/* Add additional lesson content display here */}
        </div>
      ))}
    </div>
  );
}

export default TutorCourseLessonsPage;
