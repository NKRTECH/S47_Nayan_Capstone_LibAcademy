import React from "react";
import NavTutor from "./NavTutor";
import { Box } from "@mui/material";

const LayoutTutor = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#121212", // Dark background color
        color: "#ffffff", // Text color
      }}
    >
      <NavTutor />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: "64px", // Adjust based on AppBar height
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center children horizontally
        }}
      >
        {children} 
      </Box>
    </Box>
  );
};

export default LayoutTutor;
