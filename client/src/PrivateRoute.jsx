import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./context/UserData";
import { Backdrop, CircularProgress } from "@mui/material";

function PrivateRoute({ element: Element }) {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#41a5a9", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  if (location.pathname.startsWith("/admin")) {
    return user.role === "admin" ? <Element /> : <Navigate to="/signup" />;
  }

  if (location.pathname.startsWith("/owner")) {
    return user.role === "owner" ? <Element /> : <Navigate to="/signup" />;
  }

  if (location.pathname.startsWith("/renter")) {
    return user.role === "renter" ? <Element /> : <Navigate to="/signup" />;
  }

  return <Navigate to="/signin" />;
}

export default PrivateRoute;
