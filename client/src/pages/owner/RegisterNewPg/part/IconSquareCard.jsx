import React from "react";
import { Box, Typography } from "@mui/material";

export default function IconSquareCard({ icon, label, onClick, selected }) {
  const borderColor = selected ? "#50dee3" : "#ccc";
  const textColor = selected ? "#50dee3" : "#888";

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
        border: "2px solid",
        borderColor,
        borderRadius: 2,
        cursor: "pointer",
        transition: "border-color 0.3s",
        "&:hover": {
          borderColor: "#41a5a9",
        },
      }}
    >
      <Box
        sx={{
          color: textColor,
          transition: "color 0.3s",
          "&:hover": {
            color: "#41a5a9",
          },
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          color: textColor,
          transition: "color 0.3s",
          "&:hover": {
            color: "#41a5a9",
          },
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
