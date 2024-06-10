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

const NavTutor = () => {
  const { status, tutorData } = useSelector((state) => state.tutor);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Logo to="/">LibAcademy</Logo>
        <Box display="flex" alignItems="center">
          <NavButton component={Link} to="/tutor/">
            Home
          </NavButton>
          <NavButton component={Link} to="/tutor/courses">
            Courses
          </NavButton>
          <NavButton component={Link} to="/tutor/about">
            About Us
          </NavButton>
          {tutorData && (
            <>
              <Typography variant="h6" sx={{ marginRight: 2 }}>
                Welcome, {tutorData.firstName}
              </Typography>
              <NavButton component={Link} to="/tutor/profile">
                Profile
              </NavButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavTutor;
