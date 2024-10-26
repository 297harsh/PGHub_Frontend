import { createTheme } from "@mui/material/styles";
import { createContext, useState, useMemo } from "react";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        IconColor: "#000000",
        IconColorHover: "#7a5af5",

        HeaderTitle: "#7a5af5",
        HeaderSubTitle: "#7a5af5",

        DashMainBody: "#5c5757",

        SidebarBackground: "#282828",
        SidebarAppName: "#7a5af5",
        SidebarUserName: "#7a5af5",
        SidebarSectionName: "#7a5af5",
        // ActiveOption:"#6870fa", // set in Iteam.jsx
        SidebarOptionName: "#ffffff",
        SidebarOptionNameHover: "#7a5af5",

        RegisterNewPgTitle: "#7a5af5",
        NextPrev: "#7a5af5",
        NextPrevHover: "#7a5af5",
      }
    : {
        IconColor: "#000000",
        IconColorHover: "#7a5af5",

        HeaderTitle: "#7a5af5",
        HeaderSubTitle: "#7a5af5",

        DashMainBody: "#ffffff",

        SidebarBackground: "#ece7e7",
        SidebarAppName: "#7a5af5",
        SidebarUserName: "#7a5af5",
        SidebarSectionName: "#7a5af5",
        // ActiveOption:"#6870fa", // set in Iteam.jsx
        SidebarOptionName: "#000000",
        SidebarOptionNameHover: "#7a5af5",

        RegisterNewPgTitle: "#7a5af5",
        NextPrev: "#7a5af5",
        NextPrevHover: "#7a5af5",
      }),
});

// Mui Theme Settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      primary: {
        // main: colors.primary[500],
        main: "#1f3e72",
      },
      secondary: {
        main: "#23c45a",
        // main: colors.greenAccent[500],
      },
      error: {
        main: "#e23b3b",
        // main: colors.redAccent[500],
      },
      warning: {
        main: "#f4c000",
        // main: colors.yellowAccent[500],
      },
      // neutral: {
      //   dark: colors.gray[700],
      //   main: colors.gray[500],
      //   light: colors.gray[100],
      // },
      // background: {
      //   default: colors.primary[100],
      // },
    },
    typography: {
      fontFamily: [
        "Roboto",
        "Helvetica",
        "Arial",
        "Source Sans Pro",
        "sans-serif",
      ].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: "bolder",
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 700,
        textTransform: "capitalize",
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 700,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
      },
      body2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "16px", // Change the font size
            // fontWeight: 550, // Change the font weight
            fontFamily: "Arial, sans-serif", // Change the font family
            letterSpacing: "1px", // Change the letter spacing
            textTransform: "none", // Prevent uppercase transformation
          },
        },
      },
      // MuiSvgIcon: {
      //   styleOverrides: {
      //     root: {
      //       color: colors.IconColor, // Default icon color
      //       "&:hover": {
      //         color: colors.IconHoverColor, // Icon color on hover
      //       },
      //     },
      //   },
      // },
    },
  };
};

// Context For Color Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
