import { Box } from "@mui/material";

import { Header } from "../../../components";

export default function BookedPgs() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
      <Header title="Booked PGs" subtitle="View your list of booked PGs" />
      </Box>
    </Box>
  );
}