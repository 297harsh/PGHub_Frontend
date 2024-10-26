import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Slide,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serverapiUrl = import.meta.env.VITE_API_URL;

import { UserContext } from "../../../context/UserData";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleGoogleLogin = () => {
    window.location.href = `${serverapiUrl}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${serverapiUrl}/auth/facebook`;
  };

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverapiUrl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        setUser(data.userData);
        localStorage.setItem("accesstoken", data.token);
        toast.success("Login successful");
        setTimeout(() => {
          // navigate("/");
          navigate(-1);

        }, 2500);
      } else {
        toast.error(data.message || "Internal error, please try again later.");
      }
    } catch (err) {
      console.log(email);
      toast.error(`Login failed: ${err.message}`);
    }
  };

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            borderRadius: 2,
            m: 1,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={userLogin}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Divider sx={{ my: 2 }}>OR</Divider>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{ width: "48%" }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={handleFacebookLogin}
                sx={{ width: "48%" }}
              >
                Facebook
              </Button>
            </Box>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate("/signup")}
            >
              New User? Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Slide>
  );
};

export default Signin;
