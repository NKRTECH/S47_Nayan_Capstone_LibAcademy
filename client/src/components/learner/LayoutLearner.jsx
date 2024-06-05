import React from "react";
import NavLearner from "./NavLearner";
import { Box } from "@mui/material";

const LayoutLearner = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        // backgroundColor: "#f0f0f0", // Adjust background color as needed
        backgroundColor: "#121212",
        color: "#ffffff",
      }}
    >
      <NavLearner />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: "64px", // Adjust based on AppBar height
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LayoutLearner;
