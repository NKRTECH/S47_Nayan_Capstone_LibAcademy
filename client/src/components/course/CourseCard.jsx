// CourseCard.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CourseCard.module.css'; // Import as a module
import DescriptionModal from './DescriptionModal';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CourseCard = ({ course }) => {
    const { title, description, tutorId, fileUrl, price, enrollmentCount, lessonIds, averageRating } = course;
    const {enrolledCourses} = useSelector((state) => state.learner)
    // console.log(typeof price)
    console.log('enrolledCourses:====== ', enrolledCourses);
    const BASE_URL = "http://localhost:3000/";
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : '';
  console.log(decodedToken);
  const role = decodedToken?.role
  const navigate = useNavigate();

  const handleReadMore = (event) => {
    event.stopPropagation(); // This will prevent the event from propagating to parent elements
    setShowModal(true); // Show the modal when "Read More" is clicked
  };

  const handleCloseModal = (event) => {
    event.stopPropagation(); // This will prevent the event from propagating to parent elements
    setShowModal(false); // Hide the modal when "Close" is clicked
  };

  const handleEnrollNow = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from propagating to parent elements
    try {
      // Send a request to your server to create an order
      const response = await axios.post(`${BASE_URL}api/payments/create-order`, {
        amount: Number(price * 100), // Convert the price to paise
        learnerId: decodedToken.learnerId, // Assuming the learner's ID is in the decoded token
        courseId: course._id, // Assuming the course ID is in the course object
        currency: "INR", // Currency
        paymentMethod: "phonepe", // Specify PhonePe as the payment method
        status: "pending", // Initial status
      });

      console.log("Order created successfully:", response.data);

      // Redirect the user to the PhonePe payment page
      // The URL should be the one returned by your server after creating the order
      const paymentPageUrl = response.data.paymentPageUrl; // This should be replaced with the actual URL structure you receive
      if(paymentPageUrl) {
        window.location.href = paymentPageUrl;
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  const enrollButton = () => {
    // Check if any course object in enrolledCourses has an id matching course._id
    const isEnrolled = enrolledCourses.some(
      (enrolledCourse) => enrolledCourse._id === course._id
    );
    console.log('isEnrolled: ', isEnrolled);

    if (isEnrolled) {
      return <button className={styles.enrolledButton}>Enrolled</button>;
    } else {
      return (
        <button className={styles.enrollButton} onClick={handleEnrollNow}>
          Enroll Now
        </button>
      );
    }
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
          {enrollButton()}
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
