import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import MaintenanceIcon from "@mui/icons-material/Construction";
import WaterIcon from "@mui/icons-material/Water";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "react-router-dom";

export default function PgCharges({ formValues, handleChange }) {
  const navigate = useNavigate();

  const navigateBack = () => navigate(-1);
  const navigateNext = () => navigate("/owner/registerNewPg/rule");

  const inputSx = { mt: 2 };
  const iconSx = { mr: 1 };

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
            PG Charges
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Other Charges</Typography>

          <TextField
            margin="normal"
            fullWidth
            id="deposit"
            label="Deposit"
            name="deposit"
            select
            value={formValues.deposit || ""}
            onChange={handleChange}
            sx={inputSx}
          >
            <MenuItem value="Require">Require</MenuItem>
            <MenuItem value="Not Require">Not Require</MenuItem>
          </TextField>

          {formValues.deposit === "Require" && (
            <TextField
              fullWidth
              name="depositAmount"
              label="Deposit Amount"
              value={formValues.depositAmount || ""}
              onChange={handleChange}
              type="number"
              InputProps={{
                startAdornment: <PaymentIcon sx={iconSx} />,
              }}
              sx={inputSx}
            />
          )}

          <TextField
            fullWidth
            name="maintenance"
            label="Maintenance"
            value={formValues.maintenance || ""}
            onChange={handleChange}
            type="number"
            InputProps={{
              startAdornment: <MaintenanceIcon sx={iconSx} />,
            }}
            sx={inputSx}
          />

          <TextField
            margin="normal"
            fullWidth
            id="electricityCharges"
            label="Electricity Charges"
            name="electricityCharges"
            select
            value={formValues.electricityCharges || ""}
            onChange={handleChange}
            sx={inputSx}
          >
            <MenuItem value="Included in Rent">Included in Rent</MenuItem>
            <MenuItem value="Not Included in Rent">
              Not Included in Rent
            </MenuItem>
          </TextField>

          <TextField
            margin="normal"
            fullWidth
            id="waterCharges"
            label="Water Charges"
            name="waterCharges"
            select
            value={formValues.waterCharges || ""}
            onChange={handleChange}
            sx={inputSx}
          >
            <MenuItem value="Included in Rent">Included in Rent</MenuItem>
            <MenuItem value="Not Included in Rent">
              Not Included in Rent
            </MenuItem>
          </TextField>

          {formValues.waterCharges === "Not Included in Rent" && (
            <TextField
              fullWidth
              name="waterChargeAmount"
              label="Water Charge Amount"
              value={formValues.waterChargeAmount || ""}
              onChange={handleChange}
              type="number"
              InputProps={{
                startAdornment: <WaterIcon sx={iconSx} />,
              }}
              sx={inputSx}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={navigateBack}>
              Prev
            </Button>
            <Button variant="contained" onClick={navigateNext}>
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
  