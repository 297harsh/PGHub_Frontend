import React from "react";
import { Box } from "@mui/material";

import { Header } from "../../../components";

export default function DashHome() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
}