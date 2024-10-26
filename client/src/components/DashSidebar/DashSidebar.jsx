import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  DashboardOutlined,
  HelpOutlineOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  ReceiptOutlined,
  Home,
  AddHome,
  MessageOutlined,
  AccessTimeSharp,
  Logout,
  SettingsOutlined,
  FavoriteBorderOutlined,
  PersonOutlined, 
  ChatOutlined,
} from "@mui/icons-material";

import { UserContext } from "../../context/UserData";
import { tokens } from "../../theme";
import logo from "../../assets/pghub/logo.png";
import DefaultProfileImage from "../../assets/pghub/DefaultProfileImage.jpg";
import Item from "./Item";

export default function DashSidebar({ toggled, setToggled, sidebarOptions }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const sideIcon = useMemo(
    () => ({
      DashboardOutlined,
      Home,
      AddHome,
      ReceiptOutlined,
      PeopleAltOutlined,
      MessageOutlined,
      AccessTimeSharp,
      HelpOutlineOutlined,
      Logout,
      SettingsOutlined,
      ChatOutlined,
      FavoriteBorderOutlined,
      PersonOutlined,
    }),
    []
  );

  const handleToggleCollapse = () => setCollapsed(!collapsed);
  const handleCloseSidebar = () => setToggled(false);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accesstoken");
    navigate("/");
  };

  const renderMenuItem = (title, path, icon) => (
    <Item key={title} title={title} path={path} icon={icon} />
  );

  return (
    <Sidebar
      backgroundColor={colors.SidebarBackground}
      rootStyles={{ border: 0, height: "100%" }}
      collapsed={collapsed}
      onBackdropClick={handleCloseSidebar}
      toggled={toggled}
      breakPoint="md"
    >
      {/* Logo and Toggle Button */}
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem rootStyles={{ margin: "10px 0 20px 0" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box display="flex" alignItems="center" gap="12px">
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={logo}
                  alt="PGHub Logo"
                />
                <Typography variant="h4" color={colors.SidebarAppName}>
                  PGHub
                </Typography>
              </Box>
            )}
            <IconButton onClick={handleToggleCollapse}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>

      {/* User Profile */}
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            src={user ? user.profilePicture : DefaultProfileImage}
            sx={{ width: "100px", height: "100px", bgcolor: "#1f3e72" }}
          />

          <Typography variant="h3" color={colors.SidebarUserName}>
            {user ? user.userName : "User"}
          </Typography>
        </Box>
      )}

      {/* Sidebar Options */}
      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        {Object.entries(sidebarOptions).map(([sectionTitle, options]) => (
          <Section key={sectionTitle} title={!collapsed ? sectionTitle : ""}>
            {Object.entries(options).map(([title, [path, iconName]]) => {
              const IconComponent = sideIcon[iconName];
              return renderMenuItem(
                title,
                path,
                IconComponent ? <IconComponent /> : null
              );
            })}
          </Section>
        ))}
        <Section title="">
          <span onClick={logout}>
            <Item title="Logout" icon={<Logout />} />
          </span>
        </Section>
      </Box>
    </Sidebar>
  );
}

const Section = ({ title, children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {title && (
        <Typography
          variant="h6"
          color={colors.SidebarSectionName}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {title}
        </Typography>
      )}
      <Menu
        menuItemStyles={{
          button: {
            ":hover": {
              color: colors.SidebarOptionNameHover,
              background: "transparent",
              transition: ".4s ease",
            },
          },
        }}
      >
        {children}
      </Menu>
    </>
  );
};
