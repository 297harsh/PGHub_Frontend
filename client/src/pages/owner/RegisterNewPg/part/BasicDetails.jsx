import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  Apartment as ApartmentIcon,
  LocationOn as LocationOnIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const initialCenter = {
  lat: 22.309425,
  lng: 72.13623,
};
// const initialCenter = {
//   lat: 22.80783218160411,
//   lng: 77.68021614265284,
// };

export default function BasicDetails({ formValues, handleChange, colors }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapApiKey, // Ensure you use your API key here
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMapClick = useCallback((event) => {
    console.log("--------------------------");
    console.log("markerPosition => ", markerPosition);
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    console.log("lat : ", lat, "  lng: ", lng);
    console.log({ lat, lng });
    setMarkerPosition({ lat, lng });
  }, []);

  const handleSetLocation = () => {
    if (markerPosition) {
      handleChange({
        target: {
          name: "gMapLocation",
          value: markerPosition,
        },
      });
    }
    handleClose();
  };

  const handleNextClick = () => {
    navigate("/owner/registerNewPg/basic");
  };

  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ color: colors.RegisterNewPgTitle }}>
            Basic Details
          </Typography>
        </Grid>

        {/* PG Name */}
        <Grid item xs={12}>
          <TextField
            label="PG Name"
            name="pgName"
            fullWidth
            value={formValues.pgName}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* PG Address */}
        <Grid item xs={12}>
          <TextField
            label="PG Address"
            name="pgAddress"
            fullWidth
            value={formValues.pgAddress}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* City */}
        <Grid item xs={4}>
          <TextField
            label="City"
            name="city"
            fullWidth
            value={formValues.city}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCityIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* State */}
        <Grid item xs={4}>
          <TextField
            label="State"
            name="state"
            fullWidth
            value={formValues.state}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ApartmentIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Zipcode */}
        <Grid item xs={4}>
          <TextField
            label="Zipcode"
            name="zipcode"
            fullWidth
            value={formValues.zipcode}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Location */}
        <Grid item xs={12}>
          <Grid container spacing={2} display="flex" alignItems="center">
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                  bgcolor: colors.NextPrev,
                  "&:hover": { bgcolor: colors.NextPrevHover },
                }}
              >
                Set PG Location
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                Latitude: {formValues.gMapLocation.lat || "Not set"}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                Longitude: {formValues.gMapLocation.lng || "Not set"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Next Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
              sx={{
                bgcolor: colors.NextPrev,
                "&:hover": { bgcolor: colors.NextPrevHover },
              }}
            >
              Next
            </Button>
          </Box>
        </Grid>

        {/* Modal for Google Map */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Select PG Location</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {isLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={initialCenter}
                zoom={8}
                onClick={handleMapClick}
                id="DEMO_MAP_ID"
              >
                {markerPosition && (
                  <Marker
                    position={{
                      lat: markerPosition.lat,
                      lng: markerPosition.lng,
                    }}
                  />
                )}
              </GoogleMap>
            )}

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography>
                {markerPosition && (
                  <>
                    {markerPosition.lat}, {markerPosition.lng}
                  </>
                )}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSetLocation}
              >
                Set Location
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </Box>
  );
}
