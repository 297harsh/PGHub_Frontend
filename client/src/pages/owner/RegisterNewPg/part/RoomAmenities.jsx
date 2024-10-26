import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import {
  AcUnit as AcUnitIcon,
  Bathtub as BathtubIcon,
  Bed as BedIcon,
  Kitchen as KitchenIcon,
  Tv as TvIcon,
  TableChart as TableChartIcon,
  Wifi as WifiIcon,
  Power as PowerIcon,
  CleaningServices as CleanIcon,
  LocalParking as ParkingIcon,
  Elevator as ElevatorIcon,
  WaterDrop as WaterDropIcon,
  Water as WaterCoolerIcon,
  Security as SecurityIcon,
  LocalLaundryService as LaundryIcon,
  BreakfastDining as BreakfastDiningIcon,
  Fastfood as FastfoodIcon,
  LunchDining as LunchDiningIcon,
  LocalDining as LocalDiningIcon,
  RestaurantMenu as RestaurantMenuIcon,
} from "@mui/icons-material";

import IconSquareCard from "./IconSquareCard";

export default function RoomAmenities({ formValues, handleChange }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => navigate(path);

  const amenitiesWithIcons = {
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

  const foodOptionsWithIcons = {
    Breakfast: <BreakfastDiningIcon />,
    Lunch: <LunchDiningIcon />,
    Dinner: <FastfoodIcon />,
  };

  const mealsProvidedWithIcons = {
    Veg: <LocalDiningIcon />,
    Nonveg: <RestaurantMenuIcon />,
  };

  const toggleSelection = (category, item) => {
    handleChange({
      target: {
        name: category,
        value: formValues[category].includes(item)
          ? formValues[category].filter((i) => i !== item)
          : [...formValues[category], item],
      },
    });
  };

  const renderIconGrid = (items, category) =>
    Object.entries(items).map(([label, icon]) => (
      <Grid item xs={6} sm={4} md={3} key={label}>
        <IconSquareCard
          icon={icon}
          label={label}
          selected={formValues[category].includes(label)}
          onClick={() => toggleSelection(category, label)}
        />
      </Grid>
    ));

  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              fontSize: "24px",
              fontFamily: '"Source Sans Pro", sans-serif',
              color: "#378386",
            }}
          >
            Amenities
          </Typography>
        </Grid>

        {/* Room Amenities */}
        <Grid item xs={12}>
          <Typography variant="h6">Room Amenities</Typography>
          <Grid container spacing={2}>
            {renderIconGrid(amenitiesWithIcons, "roomAmenities")}
          </Grid>
        </Grid>

        {/* Common Area Amenities */}
        <Grid item xs={12}>
          <Typography variant="h6">Common Area Amenities</Typography>
          <Grid container spacing={2}>
            {renderIconGrid(commonAmenitiesWithIcons, "commonAreaAmenities")}
          </Grid>
        </Grid>

        {/* Uncomment if food-related options are used */}
        {formValues.foodAvailable === "Yes" && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">Food Options</Typography>
              <Grid container spacing={2}>
                {renderIconGrid(foodOptionsWithIcons, "foodOptions")}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Meals Provided</Typography>
              <Grid container spacing={2}>
                {renderIconGrid(mealsProvidedWithIcons, "mealsProvided")}
              </Grid>
            </Grid>
          </>
        )}

        {/* Navigation Buttons */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleNavigation(-1)}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleNavigation("/owner/registerNewPg/roomDetails")
              }
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
