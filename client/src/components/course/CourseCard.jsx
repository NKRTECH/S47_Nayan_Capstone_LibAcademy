// CourseCard.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CourseCard.module.css'; // Import as a module
import DescriptionModal from './DescriptionModal';
import { jwtDecode } from 'jwt-decode';

const CourseCard = ({ course }) => {
    const { title, description, tutorId, fileUrl, price, enrollmentCount, lessonIds, averageRating } = course;
    const BASE_URL = "http://localhost:3000/";
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : '';
  const role = decodedToken?.role


  const handleReadMore = (event) => {
    event.stopPropagation(); // This will prevent the event from propagating to parent elements
    setShowModal(true); // Show the modal when "Read More" is clicked
  };

  const handleCloseModal = (event) => {
    event.stopPropagation(); // This will prevent the event from propagating to parent elements
    setShowModal(false); // Hide the modal when "Close" is clicked
  };

    // Always show the truncated description in the CourseCard
    const truncatedDescription = description.length > 100
        ? `${description.substring(0, 100)}...`
        : description;

  return (
    <div className={styles.courseCard}>
      {fileUrl && (
        <div className={styles.courseImageContainer}>
          <img src={`${BASE_URL}${fileUrl}`} alt={title} className={styles.courseImage} />
        </div>
      )}
      <div className={styles.courseDetails}>
        <h2 className={styles.courseTitle}>{title}</h2>
        <div className={styles.courseDescriptionContainer}>
          <p className={styles.courseDescription}>
            {truncatedDescription}
            {description.length > 100 && (
              <button className={styles.readMoreButton} onClick={handleReadMore}>
                  Read More
              </button>
            )}
          </p>
        </div>
        <p className={styles.courseTutor}>Instructor: {`${tutorId?.firstName} ${tutorId?.lastName}`}</p>
        {role === 'tutor' && (
          <div className={styles.courseStatistics}>
            <p className={styles.lessonCount}>Lessons: {lessonIds.length}</p>
            <p className={styles.enrollmentCount}>Enrolled: {enrollmentCount}</p>
            <p className={styles.averageRating}>Rating: {averageRating || 'N/A'}</p>
          </div>
        )}
      </div>
      {role === 'learner' && (
        <div className={styles.courseFooter}>
          <div className={styles.priceAndEnrollment}>
            <p className={styles.coursePrice}>Price: ${price}</p>
            <p className={styles.enrollmentCount}>{enrollmentCount} enrolled</p>
          </div>
          <button className={styles.enrollButton}>Enroll Now</button>
        </div>
      )}
      {showModal && (
        <DescriptionModal
          description={description}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fileUrl: PropTypes.string,
    tutorId: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    price: PropTypes.number.isRequired,
    enrollmentCount: PropTypes.number.isRequired,
    lessonIds: PropTypes.arrayOf(PropTypes.object),
    averageRating: PropTypes.number,
}).isRequired,
};

export default CourseCard;
