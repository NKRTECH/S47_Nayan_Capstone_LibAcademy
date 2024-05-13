// LessonCard.jsx
import React from 'react';
import styles from './LessonCard.module.css'; // Import CSS module

const LessonCard = ({ lesson }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{lesson.title}</h2>
      <p className={styles.contentText}>Overview: {lesson.content.text} minutes</p>
    </div>
  );
};

export default LessonCard;