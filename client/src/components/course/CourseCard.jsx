import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
  Modal,
} from "@mui/material";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import DescriptionModal from "./DescriptionModal";

const CourseCard = ({ course }) => {
  const {
    title,
    description,
    tutorId,
    fileUrl,
    price,
    enrollmentCount,
    lessonIds,
    averageRating,
  } = course;
  const { enrolledCourses } = useSelector((state) => state.learner);
const BASE_URL = import.meta.env.VITE_API_URL;
const FILE_URL = import.meta.env.VITE_FILE_URL;
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : "";
  const role = decodedToken?.role;

  const handleReadMore = (event) => {
    event.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setShowModal(false);
  };

  const handleEnrollNow = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await axios.post(
        `${BASE_URL}/payments/create-order`,
        {
          amount: Number(price * 100),
          learnerId: decodedToken.learnerId,
          courseId: course._id,
          currency: "INR",
          paymentMethod: "phonepe",
          status: "pending",
        }
      );

      const paymentPageUrl = response.data.paymentPageUrl;
      if (paymentPageUrl) {
        window.location.href = paymentPageUrl;
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  const enrollButton = () => {
    const isEnrolled = enrolledCourses.some(
      (enrolledCourse) => enrolledCourse._id === course._id
    );

    if (isEnrolled) {
      return (
        <Button variant="contained" color="success">
          Enrolled
        </Button>
      );
    } else {
      return (
        <Button variant="contained" color="primary" onClick={handleEnrollNow}>
          Enroll Now
        </Button>
      );
    }
  };

  const truncatedDescription =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <Card
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {fileUrl && (
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={`${FILE_URL}${fileUrl}`}
          sx={{ filter: "brightness(0.7)", objectFit: "cover" }}
        />
      )}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          color: "#333333",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", color: "inherit" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ flex: 1, color: "inherit" }}
        >
          {truncatedDescription}
          {description.length > 100 && (
            <Button
              size="small"
              onClick={handleReadMore}
              sx={{
                color: "#007bff",
                textTransform: "none",
                marginLeft: "5px",
                backgroundColor: "transparent",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              Read More
            </Button>
          )}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "inherit" }}
        >
          Instructor: {`${tutorId?.firstName} ${tutorId?.lastName}`}
        </Typography>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body2" sx={{ color: "inherit" }}>
                Lessons: {lessonIds.length}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ color: "inherit" }}>
                Enrolled: {enrollmentCount}
              </Typography>
            </Grid>
            <Grid item>
              <Rating value={averageRating || 0} readOnly />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      {role === "learner" && (
        <CardContent
          sx={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            color: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6" color="text.primary">
                Price: ${price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {enrollmentCount} enrolled
              </Typography>
            </Box>
            {enrollButton()}
          </Box>
        </CardContent>
      )}
      {showModal && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <DescriptionModal
            description={description}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </Card>
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
