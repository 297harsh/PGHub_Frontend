import React, { useState } from "react";
import {
  Box,
  Grid2,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import KitchenIcon from "@mui/icons-material/Kitchen";
import TvIcon from "@mui/icons-material/Tv";
import TableChartIcon from "@mui/icons-material/TableChart";
import WifiIcon from "@mui/icons-material/Wifi";
import PowerIcon from "@mui/icons-material/Power";
import CleanIcon from "@mui/icons-material/CleaningServices";
import ParkingIcon from "@mui/icons-material/LocalParking";
import ElevatorIcon from "@mui/icons-material/Elevator";
import WaterCoolerIcon from "@mui/icons-material/Water";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import SecurityIcon from "@mui/icons-material/Security";
import LaundryIcon from "@mui/icons-material/LocalLaundryService";

const roomAmenitiesWithIcons = {
  Ac: <AcUnitIcon />,
  Washroom: <BathtubIcon />,
  Cot: <BedIcon />,
  Mattress: <KitchenIcon />,
  Microwave: <KitchenIcon />,
  TV: <TvIcon />,
  "Side Table": <TableChartIcon />,
};

const commonAmenitiesWithIcons = {
  Wifi: <WifiIcon />,
  "Power Backup": <PowerIcon />,
  "Room Service": <CleanIcon />,
  Parking: <ParkingIcon />,
  Lift: <ElevatorIcon />,
  Laundry: <LaundryIcon />,
  "Water Cooler": <WaterDropIcon />,
  RO: <WaterCoolerIcon />,
  Security: <SecurityIcon />,
};

const sx1 = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
};

const sx2 = {
  borderRadius: "20px",
  width: { xs: "content-fit", md: "100%" },
  textAlign: "center",
};

const sx3 = {
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  // maxWidth: "700px",
  bgcolor: "background.paper",
  boxShadow: 3,
  borderRadius: 2,
  zIndex: 1200,
  p: 2,
};

const sx4 = {
  display: "block",
  fontSize: "0.875rem",
  padding: "8px 12px",
  margin: "4px 0",
  borderRadius: "20px",
  border: "1px solid #ddd",
  textAlign: "center",
  width: "100%",
};

const Filter = ({
  filters,
  setFilter,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleAmenitiesChange,
  isFilterChanged,
  handleRemoveAllFilters,
  handleRemoveFilter,
}) => {
  const [openDropdown, setOpenDropdown] = useState("");

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? "" : type);
  };

  const handleSelect = (type, value) => {
    setFilter(type, value);
    setOpenDropdown("");
  };

  const minPriceChange = (e) => {
    handleMinPriceChange(e.target.value);
  };
  const maxPriceChange = (e) => {
    handleMaxPriceChange(e.target.value);
  };

  const amenitiesChange = (e) => {
    handleAmenitiesChange(e.target.value);
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 4 }}>
      <Grid2 container spacing={2}>
        {/* Locality Dropdown */}
        <Grid2 item xs={6} sm={6} md={2}>
          <Box sx={sx1}>
            <Button
              variant="outlined"
              onClick={() => toggleDropdown("locality")}
              endIcon={<ArrowDropDownIcon />}
              sx={sx2}
            >
              {filters.locality || "Locality"}
            </Button>
            {openDropdown === "locality" && (
              <Box sx={sx3}>
                {[
                  "Waghodia Road",
                  "Vrundavan Char Rasta",
                  "Ajwa Road",
                  "Fatehgunj",
                  "Sayaji Baug",
                ].map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleSelect("locality", option)}
                    sx={sx4}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Grid2>

        {/* Gender Dropdown */}
        <Grid2 item xs={6} md={2} sm={6}>
          <Box sx={sx1}>
            <Button
              variant="outlined"
              onClick={() => toggleDropdown("gender")}
              endIcon={<ArrowDropDownIcon />}
              sx={sx2}
            >
              {filters.gender || "Gender"}
            </Button>
            {openDropdown === "gender" && (
              <Box sx={sx3}>
                {["Boys", "Girls", "Unisex"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleSelect("gender", option)}
                    sx={sx4}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Grid2>

        {/* Price Dropdown */}
        <Grid2 item xs={6} md={2} sm={6}>
          <Box sx={sx1}>
            <Button
              variant="outlined"
              onClick={() => toggleDropdown("price")}
              endIcon={<ArrowDropDownIcon />}
              sx={{ borderRadius: "20px", width: "100%", textAlign: "center" }}
            >
              Budget
            </Button>
            {openDropdown === "price" && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "auto",
                  // maxWidth: "700px",
                  bgcolor: "background.paper",
                  boxShadow: 3,
                  borderRadius: 2,
                  zIndex: 1200,
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "200px",
                  }}
                >
                  <TextField
                    size="small"
                    label="min"
                    name="minPrice"
                    type="number" 
                    value={filters.priceRange[0]}
                    onChange={minPriceChange}
                    sx={{ flex: 1 }} 
                  />
                  <Typography> - </Typography>
                  <TextField
                    size="small"
                    label="max"
                    name="maxPrice"
                    type="number" // Ensure it's a number input
                    value={filters.priceRange[1]}
                    onChange={maxPriceChange}
                    sx={{ flex: 1 }} 
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Grid2>

        {/* Occupancy Dropdown */}
        <Grid2 item xs={6} md={2} sm={6}>
          <Box sx={sx1}>
            <Button
              variant="outlined"
              onClick={() => toggleDropdown("occupancy")}
              endIcon={<ArrowDropDownIcon />}
              sx={sx2}
            >
              {filters.occupancy || "Occupancy"}
            </Button>
            {openDropdown === "occupancy" && (
              <Box sx={sx3}>
                {["Single", "Double", "Triple"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleSelect("occupancy", option)}
                    sx={sx4}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Grid2>

        {/* Amenities Dropdown */}
        <Grid2 item xs={6} md={2} sm={6}>
          <Box sx={sx1}>
            <Button
              variant="outlined"
              onClick={() => toggleDropdown("amenities")}
              endIcon={<ArrowDropDownIcon />}
              sx={{ borderRadius: "20px", width: "100%", textAlign: "left" }}
            >
              Amenities
            </Button>
            {openDropdown === "amenities" && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  bgcolor: "background.paper",
                  boxShadow: 3,
                  borderRadius: 2,
                  zIndex: 1200,
                  p: 2,
                }}
              >
                <Typography variant="subtitle2">Room Amenities:</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {Object.keys(roomAmenitiesWithIcons).map((amenity) => (
                    <FormControlLabel
                      key={amenity}
                      sx={{
                        flex: "1 0 50%",
                        display: "flex",
                        alignItems: "center",
                      }}
                      control={
                        <Checkbox
                          checked={filters.selectedAmenities.includes(amenity)}
                          onChange={amenitiesChange}
                          value={amenity}
                        />
                      }
                      label={
                        <>
                          {roomAmenitiesWithIcons[amenity]} {amenity}
                        </>
                      }
                    />
                  ))}
                </Box>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Common Amenities:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {Object.keys(commonAmenitiesWithIcons).map((amenity) => (
                    <FormControlLabel
                      key={amenity}
                      sx={{
                        flex: "1 0 50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      control={
                        <Checkbox
                          checked={filters.selectedAmenities.includes(amenity)}
                          onChange={amenitiesChange}
                          value={amenity}
                        />
                      }
                      label={
                        <>
                          {commonAmenitiesWithIcons[amenity]} {amenity}
                        </>
                      }
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Grid2>

        {/* Sort By Dropdown */}
        <Grid2 item xs={6} md={2} sm={6}>
          <Box sx={sx1}>
            <Button
              variant="outlined"
              onClick={() => toggleDropdown("sortBy")}
              endIcon={<ArrowDropDownIcon />}
              sx={sx2}
            >
              Sort By
            </Button>
            {openDropdown === "sortBy" && (
              <Box sx={sx3}>
                {["Price", "Rating", "Popularity"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleSelect("sortBy", option)}
                    sx={sx4}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Grid2>

        {isFilterChanged() && (
          <Grid2 item xs={12} md={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveAllFilters()}
              startIcon={<CloseIcon />}
              sx={sx2}
            >
              Clear Filters
            </Button>
          </Grid2>
        )}
      </Grid2>

      {/* Applied Filters */}
      {isFilterChanged() && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Applied Filters:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {filters.locality && (
              <Button
                variant="outlined"
                onClick={() => handleRemoveFilter("locality")}
                endIcon={<CloseIcon />}
                sx={{ borderRadius: "20px" }}
              >
                {filters.locality}
              </Button>
            )}
            {filters.gender && (
              <Button
                variant="outlined"
                onClick={() => handleRemoveFilter("gender")}
                endIcon={<CloseIcon />}
                sx={{ borderRadius: "20px" }}
              >
                {filters.gender}
              </Button>
            )}
            {filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000 ? (
              <Button
                variant="outlined"
                onClick={() => handleRemoveFilter("priceRange")}
                endIcon={<CloseIcon />}
                sx={{ borderRadius: "20px" }}
              >
                ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </Button>
            ) : null}
            {filters.occupancy && (
              <Button
                variant="outlined"
                onClick={() => handleRemoveFilter("occupancy")}
                endIcon={<CloseIcon />}
                sx={{ borderRadius: "20px" }}
              >
                {filters.occupancy}
              </Button>
            )}
            {filters.selectedAmenities.map((amenity) => (
              <Button
                key={amenity}
                variant="outlined"
                onClick={() => handleRemoveFilter("amenities", amenity)}
                endIcon={<CloseIcon />}
                sx={{ borderRadius: "20px" }}
              >
                {amenity}
              </Button>
            ))}
            {filters.sortBy && (
              <Button
                variant="outlined"
                onClick={() => handleRemoveFilter("sortBy")}
                endIcon={<CloseIcon />}
                sx={{ borderRadius: "20px" }}
              >
                {filters.sortBy}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Filter;
