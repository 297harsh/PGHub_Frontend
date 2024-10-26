import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";

import RoomSquareCard from "./RoomSquareCard";
import IconSquareCard from "./IconSquareCard";

const foodOptionsWithIcons = {
  Breakfast: <BreakfastDiningIcon />,
  Lunch: <LunchDiningIcon />,
  Dinner: <FastfoodIcon />,
};

const mealsProvidedWithIcons = {
  Veg: <LocalDiningIcon />,
  Nonveg: <RestaurantMenuIcon />,
};

export default function RoomDetails({
  formValues,
  setFormValues,
  handleChange,
  selectedImages,
  handleRemoveImage,
  handleImageChange,
  colors,
}) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [newRoomDetails, setNewRoomDetails] = useState({
    roomType: "",
    numOfRoom: 0,
    RentOfBed: "",
    numOfBed:0,
  });

  // Calculate total rooms and beds whenever roomInfo changes
  useEffect(() => {
    let totalRooms = 0;
    let totalBeds = 0;

    Object.entries(formValues.roomInfo).forEach(([roomType, details]) => {
      const numOfRoom = parseInt(details.numOfRoom) || 0;
      totalRooms += numOfRoom;
      totalBeds += numOfRoom * getBedsForType(roomType);
    });

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      totalRooms: totalRooms.toString(),
      totalBeds: totalBeds.toString(),
    }));
  }, [formValues.roomInfo, setFormValues]);

  const getBedsForType = (type) => {
    switch (type) {
      case "single":
        return 1;
      case "double":
        return 2;
      case "triple":
        return 3;
      case "quadruple":
        return 4;
      default:
        return 0;
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRoomTypeClick = (type) => {
    if (formValues.roomInfo.hasOwnProperty(type)) {
      setNewRoomDetails({
        roomType: type,
        numOfRoom: formValues.roomInfo[type].numOfRoom,
        RentOfBed: formValues.roomInfo[type].RentOfBed,
      });
    } else {
      setNewRoomDetails((prevDetails) => ({
        ...prevDetails,
        roomType: type,
      }));
    }
  };

  const handleRoomDetailChange = (event) => {
    const { name, value } = event.target;
    setNewRoomDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddRoom = () => {
    if (
      !newRoomDetails.roomType ||
      !newRoomDetails.numOfRoom ||
      !newRoomDetails.RentOfBed
    ) {
      // Handle validation or show an error
      return;
    }

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      roomInfo: {
        ...prevFormValues.roomInfo,
        [newRoomDetails.roomType]: {
          numOfRoom: newRoomDetails.numOfRoom,
          RentOfBed: newRoomDetails.RentOfBed,
          numOfBed: getBedsForType(newRoomDetails.roomType)*newRoomDetails.numOfRoom
        },
      },
    }));

    setNewRoomDetails({
      roomType: "",
      numOfRoom: "",
      RentOfBed: "",
    });
    handleCloseDialog();
  };

  const handleRemoveRoom = (roomType) => {
    setFormValues((prevFormValues) => {
      const updatedRoomInfo = { ...prevFormValues.roomInfo };
      delete updatedRoomInfo[roomType];
      return {
        ...prevFormValues,
        roomInfo: updatedRoomInfo,
      };
    });
  };

  // food
  const handleCardClick = (category, item) => {
    handleChange({
      target: {
        name: category,
        value: formValues[category].includes(item)
          ? formValues[category].filter((i) => i !== item)
          : [...formValues[category], item],
      },
    });
  };

  const handlePrevClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    navigate("/owner/registerNewPg/charges");
  };

  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ color: colors.RegisterNewPgTitle }}>
            Room and Food Details
          </Typography>
        </Grid>

        {/* Add Room Button */}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Add Room
          </Button>
        </Grid>

        {/* Display RoomSquareCard components based on roomInfo */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2, // Space between cards
              mt: 2, // Margin top for spacing
            }}
          >
            {Object.keys(formValues.roomInfo).map((roomType) => (
              <Box
                key={roomType}
                sx={{
                  flexBasis: { xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }, // Responsive width
                  flexGrow: 1,
                }}
              >
                <RoomSquareCard
                  roomType={roomType}
                  numOfRoom={formValues.roomInfo[roomType].numOfRoom}
                  RentOfBed={formValues.roomInfo[roomType].RentOfBed}
                  onRemove={() => handleRemoveRoom(roomType)}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              gap: 2,
            }}
          >
            <Button variant="outlined">
              Total Room = {formValues.totalRooms || 0}
            </Button>
            <Button variant="outlined">
              Total Beds = {formValues.totalBeds || 0}
            </Button>
          </Box>
        </Grid>

        {/* images */}

        <Grid item xs={12}>
          <InputLabel>Upload Images</InputLabel>
          <FormControl>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCameraIcon />}
            >
              Upload
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </FormControl>
        </Grid>

        {selectedImages.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6">Selected Images</Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mt: 2,
              }}
            >
              {selectedImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: 120,
                    height: 120,
                    borderRadius: 1,
                    overflow: "hidden",
                    boxShadow: 2,
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
        )}

        {/* Dialog for adding room details */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add Room</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>Room Type</Typography>
              <Box display="flex" flexDirection="row" gap={2}>
                {["single", "double", "triple", "quadruple"].map((type) => (
                  <IconSquareCard
                    key={type}
                    icon={<SingleBedIcon />}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                    selected={newRoomDetails.roomType === type}
                    onClick={() => handleRoomTypeClick(type)}
                  />
                ))}
              </Box>
              <TextField
                label="Number of Rooms"
                name="numOfRoom"
                value={newRoomDetails.numOfRoom}
                onChange={handleRoomDetailChange}
                type="number"
                fullWidth
              />
              <TextField
                label="Rent per Bed"
                name="RentOfBed"
                value={newRoomDetails.RentOfBed}
                onChange={handleRoomDetailChange}
                type="number"
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddRoom} variant="contained">
              Add Room
            </Button>
          </DialogActions>
        </Dialog>

        {/* Food  */}
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            sx={{ mt: 2 }}
            id="foodAvailable"
            label="Food Available"
            name="foodAvailable"
            select
            value={formValues.foodAvailable || ""}
            onChange={handleChange}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>

        {formValues.foodAvailable === "Yes" && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">Food Options</Typography>
              <Grid container spacing={2}>
                {Object.entries(foodOptionsWithIcons).map(([option, icon]) => (
                  <Grid item xs={6} sm={4} md={3} key={option}>
                    <IconSquareCard
                      icon={icon}
                      label={option}
                      selected={formValues.foodOptions.includes(option)}
                      onClick={() => handleCardClick("foodOptions", option)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Meals Provided</Typography>
              <Grid container spacing={2}>
                {Object.entries(mealsProvidedWithIcons).map(([meal, icon]) => (
                  <Grid item xs={6} sm={4} md={3} key={meal}>
                    <IconSquareCard
                      icon={icon}
                      label={meal}
                      selected={formValues.foodType.includes(meal)}
                      onClick={() => handleCardClick("foodType", meal)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                sx={{ mt: 2 }}
                id="foodCharges"
                label="Food Charges"
                name="foodCharges"
                select
                value={formValues.foodCharges || ""}
                onChange={handleChange}
              >
                <MenuItem value="Included in Rent">Included in Rent</MenuItem>
                <MenuItem value="Not Included in Rent">
                  Not Included in Rent
                </MenuItem>
              </TextField>
            </Grid>

            {formValues.foodCharges == "Not Included in Rent" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="foodChargesAmount"
                    label="Food Charge Amount"
                    value={formValues.foodChargesAmount || ""}
                    onChange={handleChange}
                    type="number"
                    InputProps={{
                      startAdornment: <RestaurantIcon sx={{ mr: 1 }} />,
                    }}
                    sx={{ mt: 2 }}
                  />
                </Grid>
              </>
            )}
          </>
        )}

        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePrevClick}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
