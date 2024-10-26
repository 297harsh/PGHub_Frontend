import { useState } from "react";
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
  MenuItem,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import "react-toastify/dist/ReactToastify.css";

const serverapiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = `${serverapiUrl}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${serverapiUrl}/auth/facebook`;
  };

  const userRegister = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions");
      return;
    }
    console.log(termsAccepted);
    try {
      const response = await fetch(`${serverapiUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          mobileNo,
          password,
          role,
          termsAccepted,
        }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("accesstoken", data.token);
        toast.success("Registration successful");
        setTimeout(() => {
          // navigate("/");
          navigate(-1);
        }, 3000);
      } else {
        toast.error(data.message || "Internal error, please try again later");
      }
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`);
    }
  };

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAddAltIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={userRegister}
            sx={{ mt: 3, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="username"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobileNo"
              label="Mobile No."
              name="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="role"
              label="Role"
              name="role"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="renter">Renter</MenuItem>
              <MenuItem value="owner">Owner</MenuItem>
            </TextField>

            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </a>
                </Typography>
              }
              sx={{ mt: 2 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
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
                color="secondary"
              >
                Google
              </Button>

              <Button
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={handleFacebookLogin}
                sx={{ width: "48%" }}
                color="secondary"
              >
                Facebook
              </Button>
            </Box>
            <Button
              fullWidth
              variant="text"
              sx={{ mt: 1 }}
              onClick={() => navigate("/signin")}
              color="secondary"
            >
              Already have an account? Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Slide>
  );
};

export default Signup;
