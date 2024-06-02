import React from "react";
import PropTypes from "prop-types";
import { Modal, Typography, Button, Box, Slide } from "@mui/material";

const DescriptionModal = ({ description, onClose }) => {
  const handleBackdropClick = (event) => {
    event.stopPropagation(); // Prevent click from propagating to elements behind the modal
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={handleBackdropClick} // Handle click event on the modal backdrop
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: 400,
            background: "linear-gradient(135deg, #FEB692 0%, #EA5455 100%)",
            color: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" id="modal-title" gutterBottom>
            Course Description
          </Typography>
          <Typography variant="body1" id="modal-description" gutterBottom>
            {description}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

DescriptionModal.propTypes = {
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DescriptionModal;
