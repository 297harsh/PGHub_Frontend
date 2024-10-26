import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { formatDate } from "@fullcalendar/core";

const VisitSidebar = ({ currentEvents, colors }) => {
  return (
    <Box
      flex="1 1 20%"
      bgcolor={colors.primary.main}
      p="15px"
      borderRadius="4px"
    >
      <Typography variant="h5">Events</Typography>
      <List>
        {currentEvents.map((event) => (
          <ListItem
            key={event.id}
            sx={{
              bgcolor: colors.success.main,
              my: "10px",
              borderRadius: "2px",
            }}
          >
            <ListItemText
              primary={`${event.title}`}
              secondary={
                <Typography>
                  {formatDate(new Date(event.start), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default VisitSidebar;
