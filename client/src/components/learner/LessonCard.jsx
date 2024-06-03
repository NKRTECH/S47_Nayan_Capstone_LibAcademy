/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material"; // Material-UI lock icon
import { styled } from "@mui/system";

// Styled Card component with dynamic styles
const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  transition: "background 0.5s",
  "&:hover": {
    background: "linear-gradient(135deg, #fd746c 0%, #ff9068 100%)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      animation: "$etherealEffect 2s linear infinite",
      zIndex: -1,
    },
  },
  "@keyframes etherealEffect": {
    "0%": {
      backgroundPosition: "0 0",
    },
    "100%": {
      backgroundPosition: "100% 0",
    },
  },
}));

// Styled Lock icon with dropping effect
const StyledLock = styled(Lock)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  animation: `$drop 0.8s ease-in-out infinite`,
  "@keyframes drop": {
    "0%, 100%": {
      transform: "translate(-50%, -50%)",
    },
    "50%": {
      transform: "translate(-50%, 10%)",
    },
  },
}));

const LessonCard = ({ lesson, isEnrolled }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLessonClick = () => {
    if (!isEnrolled) {
      alert("You need to enroll in this course to access the lesson.");
      console.log("Not enrolled");
    } else {
      // Navigate to the lesson details page with the current path as a suffix
      navigate(`${location.pathname}/lessons/${lesson._id}`);
    }
  };

  return (
    <StyledCard onClick={handleLessonClick}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {lesson.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Overview: {lesson.content.text}
        </Typography>
        {!isEnrolled && <StyledLock />}{" "}
        {/* Display lock icon if not enrolled */}
      </CardContent>
    </StyledCard>
  );
};

export default LessonCard;
