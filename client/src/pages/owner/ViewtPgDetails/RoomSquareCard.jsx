import { Box, Typography } from "@mui/material";
import SingleBedIcon from "@mui/icons-material/SingleBed";
// import PropTypes from "prop-types";

const RoomSquareCard = ({
  roomType,
  numOfRoom,
  totalNumOfRoom,
  remainNumOfBed,
  numOfBed,
  RentOfBed,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "80px", sm: "100px", md: "120px" },
        height: { xs: "100px", sm: "160px", md: "140px" },
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
      aria-label={`${roomType} - ${numOfBed} beds - ₹${RentOfBed} per month`} // Added aria-label for accessibility
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
        Total Beds: {totalNumOfRoom}
        {/* {numOfBed} Beds */}
        {/* brds */}
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
        Remain Beds: {remainNumOfBed}
        {/* {numOfBed} Beds */}
        {/* brds */}
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

// Define prop types
// RoomSquareCard.propTypes = {
//   roomType: PropTypes.string.isRequired,
//   numOfRoom: PropTypes.number.isRequired,
//   numOfBed: PropTypes.number.isRequired,
//   RentOfBed: PropTypes.number.isRequired,
// };

export default RoomSquareCard;
