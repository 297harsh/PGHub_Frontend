import React, { useState } from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import { tokens } from "../../theme";
import { DashSidebar, DashNavbar , Profile} from "../../components";

import {
  DashHome,
  BookedPgs,
  Bookmarks,
  Payments,
  VisitRequestR,
  FAQR
} from "../../pages";
import { sidebarOptions } from "./sidebarOptions";

export default function Layout() {
  const [toggled, setToggled] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          maxWidth: "100%",
          bgcolor: "#fff",
        }}
      >
        <DashSidebar
          toggled={toggled}
          setToggled={setToggled}
          sidebarOptions={sidebarOptions}
        />
        <Box
          sx={{
            bgcolor: colors.DashMainBody,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            maxWidth: "100%",
          }}
        >
          <DashNavbar toggled={toggled} setToggled={setToggled} />
          <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
            {/* <Outlet /> */}
            <Routes>
              <Route path="" element={<DashHome />} />
              <Route path="/bookedpgs/*" element={<BookedPgs />} />
              <Route path="/bookmarks/*" element={<Bookmarks />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/visitRequest" element={<VisitRequestR />} />
              <Route path="/faq" element={<FAQR />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
