// CourseCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CourseCard.module.css'; // Import as a module
import DescriptionModal from './DescriptionModal';

const CourseCard = ({ course }) => {
  const { title, description, tutorId, fileUrl, price, enrollmentCount } = course;
  const BASE_URL = "http://localhost:3000/";
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleReadMore = () => {
    setShowModal(true); // Show the modal when "Read More" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal when "Close" is clicked
  };

  const truncatedDescription = description.length > 100 && !showModal
    ? description.substring(0, 100) + '...'
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
            {!showModal && description.length > 100 && (
              <button className={styles.readMoreButton} onClick={handleReadMore}>
                Read More
              </button>
            )}
          </p>
        </div>
        <p className={styles.courseTutor}>Instructor: {`${tutorId?.firstName} ${tutorId?.lastName}`}</p>
      </div>
      <div className={styles.courseFooter}>
        <div className={styles.priceAndEnrollment}>
          <p className={styles.coursePrice}>Price: ${price}</p>
          <p className={styles.enrollmentCount}>{enrollmentCount} enrolled</p>
        </div>
        <button className={styles.enrollButton}>Enroll Now</button>
      </div>
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
  }).isRequired,
};

export default CourseCard;
