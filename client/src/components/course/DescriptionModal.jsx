// DescriptionModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './DescriptionModal.module.css'; // Import as a module

const DescriptionModal = ({ description, onClose }) => {
  return (
    <div className={styles.modalBackdrop}>
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
