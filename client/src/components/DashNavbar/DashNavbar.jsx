import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import { UserContext } from "../../context/UserData";
import { tokens, ColorModeContext } from "../../theme";
import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  PersonOutlined,
  SearchOutlined,
} from "@mui/icons-material";

const DashNavbar = ({ setToggled }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");

  const handleIconClick = () => {
    navigate("/owner/profile");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          sx={{ display: isMdDevices ? "flex" : "none" }}
          onClick={() => setToggled((prev) => !prev)}
        >
          <MenuOutlined />
        </IconButton>

        {/* Search Bar */}
        <Box
          display={isXsDevices ? "none" : "flex"}
          alignItems="center"
          borderRadius="3px"
          sx={{
            bgcolor: "#dddbdb",
            transition: "background-color 0.3s ease",
            "&:hover": {
              bgcolor: "#d0d0d0",
            },
            "&:focus-within": {
              bgcolor: "#f4ebeb",
            },
          }}
        >
          <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchOutlined />
          </IconButton>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined
              sx={{
                fontSize: 28,
                color: colors.IconColor,
                "&:hover": {
                  color: colors.IconColorHover,
                },
              }}
            />
          ) : (
            <DarkModeOutlined
              sx={{
                fontSize: 28,
                color: colors.IconColor,
                "&:hover": {
                  color: colors.IconColorHover,
                },
              }}
            />
          )}
        </IconButton>

        <IconButton onClick={handleIconClick}>
          {user.profilePicture ? (
            <Avatar
              alt={user.userName}
              src={user.profilePicture}
              sx={{
                width: 28,
                height: 28,
              }}
            />
          ) : (
            <PersonOutlined
              sx={{
                fontSize: 24,
                color: colors.IconColor,
                "&:hover": {
                  color: colors.IconColorHover,
                },
              }}
            />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default DashNavbar;
