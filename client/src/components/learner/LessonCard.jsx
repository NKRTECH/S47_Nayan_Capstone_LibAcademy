import styles from './LessonCard.module.css'; // Import CSS module
import { FaLock } from 'react-icons/fa'; // Import a lock icon from react-icons

const LessonCard = ({ lesson, currentLearnerId, enrolledLearners }) => {
  const isEnrolled = enrolledLearners.some(learner => learner._id === currentLearnerId);

  const handleLessonClick = () => {
    if (!isEnrolled) {
      alert('You need to enroll in this course to access the lesson.');
      console.log('Not enrolled');
    } else {
      // Navigate to the lesson details page or perform any other action
      console.log('Navigating to lesson details...');
    }
  };

  return (
    <div className={styles.card} onClick={handleLessonClick}>
      <h2 className={styles.title}>{lesson.title}</h2>
      <p className={styles.contentText}>Overview: {lesson.content.text} </p>
      {!isEnrolled && <FaLock className={styles.lockIcon} />} {/* Display lock icon if not enrolled */}
    </div>
  );
};

export default LessonCard;