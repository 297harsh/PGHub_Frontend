import { useState, useContext } from "react";
import { UserContext } from "../../context/UserData";
import {
  Card,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Chip,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import {
  KingBed,
  AcUnit,
  Bathroom,
  BookmarkBorder,
  Bookmark,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { ScheduleVisitModal } from "../index";
const serverapiUrl = import.meta.env.VITE_API_URL;

const PGCard = ({ PGData, onClick }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
  const handleScheduleOpen = (event) => {
    event.stopPropagation();
    setOpenModal(true);
  };

  const handleScheduleClose = (event) => {
    event.stopPropagation();
    setOpenModal(false);
  };

  const handleBookmarkClick = async (event) => {
    event.stopPropagation(); // Prevent click event from reaching the Card component
    if (user == null) {
      toast.error("Please Login");
    } 
    else {
      setIsBookmarked(!isBookmarked);
      try {
        const response = await fetch(`${serverapiUrl}/bookmarks/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            renterId:user._id,
            pgId:PGData._id,
            Bookmark:!isBookmarked
          }),
        });
      }
      catch(err) {
        console.log(err);
      }
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
        },
        // width: "800px",
        width:{xs:"100%", sm:"400px",md:"600px",lg:"850px",xl:"1100px"}
      }}
      onClick={() => onClick(PGData._id)} // Pass the PG ID on click
    >
      <Grid container>
        {/* Image Section */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: "relative", height: "100%" }}>
            <CardMedia
              component="img"
              height="100%"
              // image="https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              image={PGData.images[0]}
              alt="PG Image"
              sx={{ objectFit: "cover", height: { xs: "200px", md: "100%" } }}
            />
            {/* Overlay for visitors */}
            <Box
              sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                backgroundColor: "#60C2A7",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: 1,
                boxShadow: 2,
              }}
            >
              <Typography variant="caption">
                11 People Visiting Today
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={7}>
          <Box sx={{ padding: 2 }}>
            {/* Header Section */}
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              {/* Name */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  <strong>{PGData.pgName}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {PGData.pgAddress}
                </Typography>
              </Box>
              {/* Bookmark Icon */}
              <IconButton
                onClick={handleBookmarkClick}
                sx={{
                  color: isBookmarked ? "primary.main" : "action.disabled",
                }}
              >
                {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </Box>

            {/* Amenities */}
            <Grid container spacing={1} sx={{ margin: "8px 0" }}>
              <Grid item>
                <Chip
                  icon={<AcUnit />}
                  label="AC"
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<Bathroom />}
                  label="Attached Washroom"
                  size="small"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {/* Room Types */}
            <Grid container spacing={1}>
              {Object.keys(PGData.roomInfo).map((type) => (
                <Grid item key={type} mt="6px">
                  <Chip
                    icon={<KingBed />}
                    label={type}
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Price */}
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: "bold" }}>
              ₹10,199/month
            </Typography>

            <ScheduleVisitModal
              openModal={openModal}
              handleScheduleClose={handleScheduleClose}
              pgData={PGData}
            />

            {/* Footer Section */}
            <CardActions sx={{ padding: 0, marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: 1, padding: "6px 16px" }}
                onClick={handleScheduleOpen}
              >
                Schedule a Visit
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ padding: "6px 16px" }}
              >
                Book
              </Button>
            </CardActions>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PGCard;
