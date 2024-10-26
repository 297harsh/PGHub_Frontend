import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ReviewCard = ({ profilePic, name, description, rating, time }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px",
        width: "100%",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
        backgroundColor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <Avatar
          src={profilePic}
          sx={{ width: 48, height: 48, marginRight: "16px" }}
        />
        <Box>
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {time}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        {[...Array(Math.floor(rating))].map((_, index) => (
          <StarIcon key={index} sx={{ color: "#ffc107" }} />
        ))}
        {rating % 1 !== 0 && <StarIcon sx={{ color: "#ffc107" }} />}
      </Box>
      <Typography variant="body1" sx={{ color: "#333" }}>
        {description}
      </Typography>
    </Box>
  );
};

export default ReviewCard;
