import { Box, Typography, IconButton } from "@mui/material";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import CancelIcon from "@mui/icons-material/Cancel";

const RoomSquareCard = ({ roomType, numOfRoom, RentOfBed, onRemove }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: { xs: 80, sm: 100, md: 120 },
      height: { xs: 80, sm: 100, md: 120 },
      border: "2px solid",
      borderColor: "grey.300",
      borderRadius: 2,
      cursor: "pointer",
      transition: "border-color 0.3s, transform 0.3s",
      position: "relative",
      "&:hover": {
        borderColor: "#41a5a9",
        transform: "scale(1.05)",
      },
    }}
  >
    <IconButton
      onClick={onRemove}
      sx={{
        position: "absolute",
        top: 2,
        right: 2,
        color: "grey.600",
        "&:hover": {
          color: "#e57373",
        },
      }}
    >
      <CancelIcon />
    </IconButton>
    <SingleBedIcon
      sx={{
        fontSize: { xs: 24, sm: 28, md: 32 },
        color: "grey.600",
        "&:hover": {
          color: "#41a5a9",
        },
      }}
    />
    <Typography
      variant="body2"
      sx={{ mt: 1, fontWeight: 500, color: "text.primary", "&:hover": { color: "#41a5a9" } }}
    >
      {roomType}
    </Typography>
    <Typography
      variant="body2"
      sx={{ mt: 0.5, color: "text.secondary", "&:hover": { color: "#41a5a9" } }}
    >
      {numOfRoom} Rooms
    </Typography>
    <Typography
      variant="body2"
      sx={{ mt: 0.5, color: "text.secondary", "&:hover": { color: "#41a5a9" } }}
    >
      ₹{RentOfBed}/month
    </Typography>
  </Box>
);

export default RoomSquareCard;
