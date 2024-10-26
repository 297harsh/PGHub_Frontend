import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const serverapiUrl = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extract token from URL
  const uid = searchParams.get("uid"); // Extract UID from URL
  const [emailVerified, setEmailVerified] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown time in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${serverapiUrl}/auth/verify-email`, {
          params: { token, uid },
        });

        const { data } = response;

        if (data.success) {
          // toast.success("Email successfully verified");
          localStorage.setItem("accesstoken", data.token);
          setEmailVerified(true);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(`Error: ${err.response?.data?.message || err.message}`)
        // toast.error(`Error: ${err.response?.data?.message || err.message}`);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, uid]);

  useEffect(() => {
    if (emailVerified) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [emailVerified, navigate]);

  const handleHomeRedirect = () => {
    navigate("/");
  };

  if (!emailVerified) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          mt: 5,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Verifying your email...
        </Typography>
        <CircularProgress sx={{ mt: 2 }} />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        mt: 5,
        p: 3,
        borderRadius: 1,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h2" sx={{ mb: 2, color: "#1f3e72" }}>
        <VerifiedIcon sx={{ fontSize: 80, color: "#1f3e72" }} />
      </Typography>
      <Typography variant="h4" sx={{ mb: 2, color: "#1f3e72" }}>
        Email Successfully Verified!
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Your email address has been successfully verified.
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        You will be redirected to the homepage in {countdown} seconds. if not
        click on below button
      </Typography>
      <Button variant="contained" color="primary" onClick={handleHomeRedirect}>
        Go to Home Now
      </Button>
    </Box>
  );
};

export default VerifyEmail;
