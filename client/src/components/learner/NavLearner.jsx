import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Logo = styled(Link)(({ theme }) => ({
  flexGrow: 1,
  textDecoration: "none",
  color: theme.palette.primary.contrastText,
  fontSize: 24,
  fontWeight: "bold",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: "none",
  marginRight: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:last-child": {
    marginRight: 0,
  },
}));

const NavLearner = () => {
  const { status, learnerData } = useSelector((state) => state.learner);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Logo to="/">LibAcademy</Logo>
        <Box display="flex" alignItems="center">
          <NavButton component={Link} to="/learner/">
            Home
          </NavButton>
          <NavButton component={Link} to="/learner/my-courses">
            Courses
          </NavButton>
          <NavButton component={Link} to="/about">
            About Us
          </NavButton>
          {learnerData && (
            <>
              <Typography variant="h6" sx={{ marginRight: 2 }}>
                Welcome, {learnerData.firstName}
              </Typography>
              <NavButton component={Link} to="/learner/profile">
                Profile
              </NavButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavLearner;
