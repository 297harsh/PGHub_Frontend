import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  FormGroup,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BedIcon from "@mui/icons-material/Bed";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";

const BasicDetails = ({ formValues, handleChange, handleCheckboxChange, colors }) => {
  const navigate = useNavigate();

  const navigatePrev = () => navigate(-1);
  const navigateNext = () => navigate("/owner/registerNewPg/roomAmenities");

  const renderCheckboxGroup = (label, icon, options, field) => (
    <Grid item xs={12}>
      <Box display="flex" alignItems="center">
        {icon}
        <Typography variant="h6" ml={1}>
          {label}
        </Typography>
      </Box>
      <FormGroup row>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={formValues[field]?.includes(option)}
                onChange={(e) => handleCheckboxChange(e, field, option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </Grid>
  );

  return (
    <Box m={3}>
      <Typography variant="h3" sx={{ color: colors.RegisterNewPgTitle }}>
        Basic Details
      </Typography>

      <Grid container spacing={2} mt={2}>
        {renderCheckboxGroup("Accommodation For", <BedIcon />, ["Boys", "Girls"], "gender")}
        {renderCheckboxGroup("Suitable For", <PersonIcon />, ["Student", "Employee", "Family"], "suitableFor")}

        {/* Summary */}
        <Grid item xs={12}>
          <TextField
            label="Summary"
            name="summary"
            fullWidth
            multiline
            rows={4}
            value={formValues.summary || ""}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
        </Grid>

        {/* Operating Since */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="operatingSince"
            label="Operating Since"
            value={formValues.operatingSince || ""}
            onChange={handleChange}
            InputProps={{
              startAdornment: <EventIcon sx={{ mr: 1 }} />,
            }}
          />
        </Grid>

        {/* Navigation Buttons */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" color="primary" onClick={navigatePrev}>
              Prev
            </Button>
            <Button variant="contained" color="primary" onClick={navigateNext}>
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicDetails;
