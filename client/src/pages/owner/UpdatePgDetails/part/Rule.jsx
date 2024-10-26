import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import {
  Event as EventIcon,
  TimeToLeave as TimeToLeaveIcon,
  PeopleAlt as PeopleAltIcon,
  NoFood as NoFoodIcon,
  SmokingRooms as SmokingRoomsIcon,
  MusicNote as MusicNoteIcon,
  Celebration as PartyIcon,
  Pets as PetsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function RoomDetails({ formValues, setFormValues }) {
  const navigate = useNavigate();

  const handleHouseRuleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormValues({
      ...formValues,
      houseRules: {
        ...formValues.houseRules,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              fontSize: "24px",
              fontFamily: '"Source Sans Pro", sans-serif',
              textTransform: "capitalize",
              color: "#378386",
              mb: 1,
            }}
          >
            Room Details
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">PG Rules</Typography>
          <Grid container spacing={2} mt={2}>
            {[
              {
                name: "noticePeriod",
                label: "Notice Period",
                icon: <EventIcon />,
              },
              {
                name: "gateClosingTime",
                label: "Gate Closing Time",
                icon: <TimeToLeaveIcon />,
              },
              {
                name: "visitorEntry",
                label: "Visitor Entry",
                icon: <PeopleAltIcon />,
              },
              {
                name: "nonVegFood",
                label: "Non-Veg Food",
                icon: <NoFoodIcon />,
              },
            ].map((field) => (
              <Grid item xs={12} md={6} key={field.name}>
                <TextField
                  fullWidth
                  name={field.name}
                  label={field.label}
                  value={formValues.houseRules[field.name] || ""}
                  onChange={handleHouseRuleChange}
                  InputProps={{ startAdornment: field.icon }}
                />
              </Grid>
            ))}

            {[
              {
                name: "oppositeGender",
                label: "Opposite Gender",
                icon: <PeopleAltIcon />,
              },
              { name: "smoking", label: "Smoking", icon: <SmokingRoomsIcon /> },
              { name: "drinking", label: "Drinking", icon: <NoFoodIcon /> },
              {
                name: "loudMusic",
                label: "Loud Music",
                icon: <MusicNoteIcon />,
              },
              { name: "party", label: "Party", icon: <PartyIcon /> },
              { name: "pets", label: "Pets", icon: <PetsIcon /> },
            ].map((rule) => (
              <Grid item xs={12} md={6} key={rule.name}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={rule.name}
                        checked={formValues.houseRules[rule.name] || false}
                        onChange={handleHouseRuleChange}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        {rule.icon} {rule.label}
                      </Box>
                    }
                  />
                </FormGroup>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(-1)}
            >
              Prev
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
