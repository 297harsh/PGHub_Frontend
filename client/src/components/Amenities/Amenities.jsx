import React from "react";
import { Grid, Button } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import PowerIcon from "@mui/icons-material/Power";
import CleanIcon from "@mui/icons-material/CleaningServices";
import ParkingIcon from "@mui/icons-material/LocalParking";
import ElevatorIcon from "@mui/icons-material/Elevator";
import LaundryIcon from "@mui/icons-material/LocalLaundryService";
import WaterCoolerIcon from "@mui/icons-material/Water";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import SecurityIcon from "@mui/icons-material/Security";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import KitchenIcon from "@mui/icons-material/Kitchen";
import TvIcon from "@mui/icons-material/Tv";
import TableChartIcon from "@mui/icons-material/TableChart";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import SchoolIcon from "@mui/icons-material/School";
import HailIcon from "@mui/icons-material/Hail";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import VegIcon from "./icon/veg.jsx";
import LunchIcon from "./icon/lunch.jsx";
import DinnerIcon from "./icon/DinnerIcon.jsx";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  padding: "10px 12px", // Added padding to ensure the text doesn't overflow
  textTransform: "none",
  fontSize: "14px", // Adjusted the font size for better fit
  fontWeight: "bold",
  color: "#000000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%", // Ensures all buttons are of equal width
  maxWidth: "100%", // Prevents the button from expanding beyond its container
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
  "& .MuiButton-startIcon": {
    marginRight: "8px",
    color: theme.palette.primary.main, // Uses theme color for consistency
  },
  "& .MuiButton-label": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

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
  Ac: <AcUnitIcon />,
  Washroom: <BathtubIcon />,
  Cot: <BedIcon />,
  Mattress: <KitchenIcon />,
  Microwave: <KitchenIcon />,
  TV: <TvIcon />,
  "Side Table": <TableChartIcon />,
  Veg: <VegIcon />,
  Nonveg: <FoodBankIcon />,
  Boys: <ManIcon />,
  Girls: <WomanIcon />,
  Student: <SchoolIcon />,
  Employee: <HailIcon />,
  Family: <FamilyRestroomIcon />,
  Breakfast: <FreeBreakfastIcon />,
  Lunch: <LunchIcon />,
  Dinner: <DinnerIcon />
};

export default function Amenities({ amenities }) {
  return (
    <Grid container spacing={2}>
      {amenities
        .filter((amenity) => commonAmenitiesWithIcons[amenity])
        .map((amenity) => (
          <Grid item xs={6} sm={4} md={3} key={amenity}>
            <CustomButton
              startIcon={commonAmenitiesWithIcons[amenity]}
              aria-label={amenity} // Added aria-label for better accessibility
            >
              {amenity}
            </CustomButton>
          </Grid>
        ))}
    </Grid>
  );
}
