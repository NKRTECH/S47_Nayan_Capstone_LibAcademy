import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Rating,
  Container,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import {jwtDecode} from "jwt-decode";

const CourseReviews = ({ courseId }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [newReview, setNewReview] = useState({ comment: "" });
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewComment, setEditReviewComment] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : "";
  const role = decodedToken ? decodedToken.role : "user";
  const userId = decodedToken ? decodedToken[`${role}Id`] : "";

  useEffect(() => {
    fetchReviews();
    fetchUserRating();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/courses/${courseId}/reviews`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/courses/${courseId}/ratings/${userId}`);
      setUserRating(response.data.rating.rating || 0);
      setRating(response.data.rating.rating || 0);
    } catch (error) {
      console.error("Error fetching user rating:", error);
    }
  };

  const handleAddReview = async () => {
    try {
      await axios.post(`${BASE_URL}/courses/${courseId}/reviews`, {
        learnerId: userId,
        comment: newReview.comment,
      });
      fetchReviews();
      setNewReview({ comment: "" });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleEditReview = async (reviewId, updatedComment) => {
    try {
      await axios.put(`${BASE_URL}/courses/${courseId}/reviews/${reviewId}`, {
        comment: updatedComment,
      });
      fetchReviews();
      setEditReviewId(null);
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`${BASE_URL}/courses/${courseId}/reviews/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleRatingChange = (newValue) => {
    if (isEditingRating) {
      setRating(newValue);
    }
  };

  const handleRate = async () => {
    try {
      await axios.post(`${BASE_URL}/courses/${courseId}/ratings`, {
        learnerId: userId,
        rating,
      });
      setUserRating(rating);
      setIsEditingRating(false);
      fetchUserRating();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleEditRatingClick = () => {
    setIsEditingRating(true);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ backgroundColor: "#2e3b4e", padding: 3, borderRadius: 2, color: "#ffffff" }}>
        <Typography variant="h5" gutterBottom>
          Course Reviews and Ratings
        </Typography>
        {role === "learner" && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Rate This Course
            </Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => handleRatingChange(newValue)}
              sx={{ color: "#ffd700" }}
              readOnly={!isEditingRating}
            />
            {isEditingRating ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRate}
                sx={{ marginTop: 2 }}
              >
                Submit Rating
              </Button>
            ) : (
              <IconButton
                onClick={handleEditRatingClick}
                sx={{ marginLeft: 2, color: "#ffd700" }}
              >
                <Edit />
              </IconButton>
            )}
          </Box>
        )}
        {role === "learner" && (
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Add a Review
            </Typography>
            <TextField
              label="Comment"
              multiline
              rows={2}
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#ffffff", color: "#000000" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddReview}
              sx={{ marginTop: 2 }}
            >
              Submit Review
            </Button>
          </Box>
        )}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Reviews
          </Typography>
          {reviews?.map((review) => (
            <Card key={review._id} variant="outlined" sx={{ marginBottom: 2, backgroundColor: "#ffffff", color: "#000000" }}>
              <CardContent>
                {editReviewId === review._id ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={editReviewComment}
                    onChange={(e) => setEditReviewComment(e.target.value)}
                    sx={{ backgroundColor: "#ffffff", color: "#000000" }}
                  />
                ) : (
                  <>
                    <Typography variant="body2">{review.comment}</Typography>
                    <Typography variant="caption">
                      Reviewed by: {review.learnerId.firstName} on{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </>
                )}
              </CardContent>
              {role === "learner" && review.learnerId._id === userId && (
                <CardActions>
                  {editReviewId === review._id ? (
                    <>
                      <IconButton
                        onClick={() => handleEditReview(review._id, editReviewComment)}
                      >
                        <Save />
                      </IconButton>
                      <IconButton onClick={() => setEditReviewId(null)}>
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => {
                        setEditReviewId(review._id);
                        setEditReviewComment(review.comment);
                      }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteReview(review._id)}>
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </CardActions>
              )}
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default CourseReviews;
