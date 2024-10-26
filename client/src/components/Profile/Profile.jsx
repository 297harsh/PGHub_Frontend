import { useState, useContext } from "react";
import { UserContext } from "../../context/UserData";
import {
  Container,
  Typography,
  Avatar,
  Grid,
  Button,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import ProfileSvg from "./profile.svg";
const serverapiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ ...user });

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const updateUserData = async () => {
    const changedValues = Object.keys(editValues).reduce((acc, key) => {
      if (editValues[key] !== user[key]) {
        acc[key] = editValues[key];
      }
      return acc;
    }, {});

    // Only proceed if there are changes
    if (Object.keys(changedValues).length === 0) {
      toast.info("No changes made.");
      return;
    }

    try {
      const response = await fetch(
        `${serverapiUrl}/auth/updateUserData/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ changedValues }), // Send only changed values
        }
      );

      const data = await response.json();
      if (data.success && data.userData) {
        toast.success("Update user data successfully.");
        setUser((prevUser) => ({ ...prevUser, ...changedValues })); // Update the local user state
      } else {
        toast.error(data.message || "Internal error, please try again later.");
      }
    } catch (err) {
      toast.error(`Fetch failed: ${err.message}`);
    }
  };

  const handleSaveChanges = () => {
    // setUser(editValues);
    updateUserData();
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {/* Profile Banner */}
      <Box
        sx={{
          height: "200px",
          background: "linear-gradient(45deg, #6a11cb, #2575fc)",
          borderRadius: "20px 20px 0 0",
          position: "relative",
        }}
      >
        <Avatar
          src={user.profilePicture || ProfileSvg}
          // alt={user.userName}
          sx={{
            width: 150,
            height: 150,
            border: "5px solid white",
            position: "absolute",
            top: "120px",
            left: "50%",
            transform: "translateX(-50%)",
            // bgcolor: "white",
            borderColor: "black",
          }}
        />
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: "0 0 20px 20px",
          textAlign: "center",
          marginTop: "80px",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* User Name */}
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            background:
              "linear-gradient(45deg, #ff6b6b, #f06595, #faa307, #ffbe0b)",
            backgroundClip: "text",
            textFillColor: "transparent",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: 1.2,
          }}
        >
          {user.userName}
        </Typography>

        {/* User Email */}
        <Typography
          variant="subtitle1"
          color="textSecondary"
          gutterBottom
          sx={{
            fontStyle: "italic",
            fontFamily: "'Roboto', sans-serif",
            color: "#6c757d",
          }}
        >
          {user.email}
        </Typography>

        {/* User Details */}
        <Grid container spacing={4} justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              sx={{
                color: "#17a2b8",
                textTransform: "uppercase",
                letterSpacing: 1.1,
              }}
            >
              Mobile No:
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#000", fontWeight: "medium", fontSize: "18px" }}
            >
              {isEditing ? (
                <TextField
                  name="mobileNo"
                  value={editValues.mobileNo}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
                user.mobileNo
              )}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              sx={{
                color: "#ff6347",
                textTransform: "uppercase",
                letterSpacing: 1.1,
              }}
            >
              Age:
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#000", fontWeight: "medium", fontSize: "18px" }}
            >
              {isEditing ? (
                <TextField
                  name="age"
                  value={editValues.age}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
                user.age || "Not Provided"
              )}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              sx={{
                color: "#ff7f50",
                textTransform: "uppercase",
                letterSpacing: 1.1,
              }}
            >
              About:
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#000", fontWeight: "medium", fontSize: "18px" }}
            >
              {isEditing ? (
                <TextField
                  name="about"
                  value={editValues.about}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
                user.about
              )}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                color: "#20c997",
                textTransform: "uppercase",
                letterSpacing: 1.1,
              }}
            >
              Address:
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#495057", fontWeight: "medium", fontSize: "18px" }}
            >
              {isEditing ? (
                <TextField
                  name="address"
                  value={editValues.address}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : user.address !== "NA" ? (
                `${user.address}, ${user.city}, ${user.state}`
              ) : (
                "-"
              )}
            </Typography>
          </Grid>
        </Grid>

        {/* Edit / Save Profile Button */}
        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            sx={{
              mt: 4,
              padding: "10px 20px",
              fontSize: "16px",
              background:
                "linear-gradient(45deg, #ff6b6b, #f06595, #faa307, #ffbe0b)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                background:
                  "linear-gradient(45deg, #ff6b6b, #f06595, #faa307, #ffbe0b)",
                opacity: 0.9,
              },
            }}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            sx={{
              mt: 4,
              padding: "10px 20px",
              fontSize: "16px",
              background:
                "linear-gradient(45deg, #ff6b6b, #f06595, #faa307, #ffbe0b)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                background:
                  "linear-gradient(45deg, #ff6b6b, #f06595, #faa307, #ffbe0b)",
                opacity: 0.9,
              },
            }}
          >
            Edit Profile
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
