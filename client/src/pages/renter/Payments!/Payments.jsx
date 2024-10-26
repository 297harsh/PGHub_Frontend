import React from "react";
import { Box } from "@mui/material";

import { Header } from "../../../components";

export default function Payments() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Payments" subtitle="List of Invoice Balances" />
      </Box>
    </Box>
  );
}