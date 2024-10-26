import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer } from "react-toastify";

import { UserData } from "./context/UserData";
import PrivateRoute from "./PrivateRoute";
import {
  MainLayout,
  AdminDashLayout,
  OwnerDashLayout,
  RenterDashLayout,
} from "./layouts";
import {
  Home,
  Signin,
  Signup,
  VerifyEmail,
  SearchPG,
  PgDetails,
  BookRoom,
  TermsAndConditions,
  PrivacyPolicy,
} from "./pages";

import "./App.css";
export default function App() {
  const [theme, colorMode] = useMode();

  const TokenHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem("accesstoken", token);
        navigate("/");
      }
    }, [navigate]);

    return null;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <UserData>
            <TokenHandler />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/searchpg/:city" element={<SearchPG />} />
                <Route path="/pgDetails/:pgId" element={<PgDetails />} />
                <Route path="/bookRoom/:pgId" element={<BookRoom />} />

                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
              </Route>
              {/* <Route path="/searchpg/:city" element={<SearchPG />} /> */}

              <Route
                path="/owner/*"
                element={<PrivateRoute element={OwnerDashLayout} />}
              />

              <Route
                path="/renter/*"
                element={<PrivateRoute element={RenterDashLayout} />}
              />

              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Routes>
          </UserData>
        </Router>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
