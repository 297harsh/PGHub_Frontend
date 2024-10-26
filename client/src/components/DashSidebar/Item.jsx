import { Typography, useTheme } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import "./Item.css";

const Item = ({ title, path, icon }) => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      component={<Link to={path} />}
      to={path}
      icon={icon}
      rootStyles={{
        color: path === location.pathname && "#6870fa",
      }}
      // className="sidebar-option"
    >
      <Typography
        variant="h6"
        // className="sidebar-optionName"
        color={colors.SidebarOptionName}
        sx={{
          color: path === location.pathname && "#6870fa",
          "&:hover": {
            color: colors.SidebarOptionNameHover,
          },
        }}
      >
        {title}
      </Typography>
    </MenuItem>
  );
};

export default Item;
