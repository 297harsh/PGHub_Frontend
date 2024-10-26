import { Box, Typography, IconButton } from "@mui/material";
import SingleBedIcon from "@mui/icons-material/SingleBed";

const RoomSquareCard = ({
  roomType,
  RentOfBed,
  numOfBed,
  remainNumOfRoom,
  selected,
  handleCardClick
}) => {
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
        borderColor: ` ${selected ? "#41a5a9" : "grey.300"}`, // Professional subtle border color
        borderRadius: "8px",
        cursor: "pointer",
        transition: "border-color 0.3s, transform 0.3s", // Smooth transition effects
        position: "relative",
        "&:hover": {
          borderColor: "#41a5a9",
          transform: "scale(1.05)", // Slight scale effect on hover
        },
      }}
      onClick={() => handleCardClick(roomType)} // Wrap in an anonymous function
    >
      <SingleBedIcon
        sx={{
          fontSize: { xs: "24px", sm: "28px", md: "32px" }, // Responsive icon size
          color: ` ${selected ? "#41a5a9" : "grey.600"}`,
          "&:hover": {
            color: "#41a5a9",
          },
        }}
      />
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          color: ` ${selected ? "#41a5a9" : "grey.300"}`,
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
          color: ` ${selected ? "#41a5a9" : "grey.300"}`,
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
