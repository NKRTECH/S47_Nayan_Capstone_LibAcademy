import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography } from "@mui/material";

const BASE_URL = "http://localhost:3000/"; // Update this to match your backend server URL

const PaymentRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const merchantTransactionId = searchParams.get("merchantTransactionId");
  const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

  useEffect(() => {
    if (merchantTransactionId) {
      axios
        .post(`${BASE_URL}api/payments/check-status`, {
          merchantTransactionId,
        })
        .then((response) => {
          if (response.data.success) {
            // setMessage("Payment successful!");
            navigate("/payment-success"); // Redirect to a success page
          } else {
            // setMessage("Payment failed!");
            navigate("/payment-failure"); // Redirect to a failure page
          }
        })
        .catch((error) => {
        //   setMessage("Error checking payment status. Please try again.");
          console.error("Error checking payment status:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [merchantTransactionId, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {loading ? (
        <>
          <CircularProgress />
          <Typography variant="h6">Verifying payment...</Typography>
        </>
      ) : (
        <Typography variant="h6">failed</Typography>
      )}
    </div>
  );
};

export default PaymentRedirect;
