import { Box, Typography, IconButton } from "@mui/material";
import SingleBedIcon from "@mui/icons-material/SingleBed";

const RoomSquareCard = ({ roomType, numOfRoom, numOfBed, RentOfBed }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "80px", sm: "100px", md: "120px" }, // Responsive width
        height: { xs: "80px", sm: "100px", md: "120px" }, // Responsive height
        border: "2px solid",
        borderColor: "grey.300", // Professional subtle border color
        borderRadius: "8px",
        cursor: "pointer",
        transition: "border-color 0.3s, transform 0.3s", // Smooth transition effects
        position: "relative",
        "&:hover": {
          borderColor: "#41a5a9",
          transform: "scale(1.05)", // Slight scale effect on hover
        },
      }}
    >
      <SingleBedIcon
        sx={{
          fontSize: { xs: "24px", sm: "28px", md: "32px" }, // Responsive icon size
          color: "grey.600",
          "&:hover": {
            color: "#41a5a9",
          },
        }}
      />
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          color: "text.primary",
          fontWeight: 500,
          "&:hover": {
            color: "#41a5a9",
          },
        }}
      >
        {roomType}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          color: "text.secondary",
          "&:hover": {
            color: "#41a5a9",
          },
        }}
      >
        Remain {numOfBed} 
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          color: "text.secondary",
          "&:hover": {
            color: "#41a5a9",
          },
        }}
      >
        ₹{RentOfBed}/month
      </Typography>
    </Box>
  );
};

export default RoomSquareCard;
