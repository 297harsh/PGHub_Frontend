import React from "react";
import { Box } from "@mui/material";

import { Header } from "../../../components";

export default function Bookmarks() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
      <Header title="Bookmarks" subtitle="View your bookmarked PG list" />

      </Box>
    </Box>
  );
}