import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/learner/");
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for your payment. Your transaction was completed successfully.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleHomeClick}>
        Go to Home
      </Button>
    </Container>
  );
};

export default PaymentSuccess;
