/* eslint-disable react/prop-types */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
  } from "@mui/material";
  import { ExpandMore } from "@mui/icons-material";
  
  // Define your color palette
  const colors = {
    primary: {
      100: "#040509",
      200: "#080b12",
      300: "#0c101b",
      400: "#fcfcfc",
      500: "#f2f0f0",
      600: "#434957",
      700: "#727681",
      800: "#a1a4ab",
      900: "#d0d1d5",
    },
    greenAccent: {
      100: "#0f2922",
      200: "#1e5245",
      300: "#2e7c67",
      400: "#3da58a",
      500: "#4cceac",
      600: "#70d8bd",
      700: "#94e2cd",
      800: "#b7ebde",
      900: "#dbf5ee",
    },
  };
  
  const AccordionItem = ({ question, details }) => {
    return (
      <Accordion defaultExpanded sx={{ bgcolor: `${colors.primary[400]}` }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            {question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{details}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  };
  
  export default AccordionItem;
  