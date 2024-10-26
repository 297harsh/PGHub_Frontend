import React, { useState } from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import { tokens } from "../../theme";
import { DashSidebar, DashNavbar , Profile} from "../../components";

import {
  DashHome,
  RegisterNewPg,
  RegistredPgs,
  ViewtPgDetails,
  UpdatePgDetails
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
              <Route path="/registerNewPg/*" element={<RegisterNewPg />} />
              <Route path="/registeredPgs/*" element={<RegistredPgs />} />
              <Route path="/viewpgdetails/:pgId" element={<ViewtPgDetails />} />
              <Route path="/updatepgdetails/:pgId/*" element={<UpdatePgDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
