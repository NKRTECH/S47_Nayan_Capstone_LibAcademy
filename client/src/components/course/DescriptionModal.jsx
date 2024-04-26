// DescriptionModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './DescriptionModal.module.css'; // Import as a module

const DescriptionModal = ({ description, onClose }) => {

  const handleBackdropClick = (event) => {
    event.stopPropagation(); // Prevent click from propagating to elements behind the modal
};

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
        <div className={styles.modalContent}>
            <p>{description}</p>
            <button className={styles.closeButton} onClick={onClose}>
                Close
            </button>
        </div>
    </div>
  );
};

DescriptionModal.propTypes = {
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DescriptionModal;
