import { useState, useContext, useEffect } from "react";
import {
  useMediaQuery,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { Header } from "../../../components";
import { UserContext } from "../../../context/UserData";

import { formatDate } from "@fullcalendar/core";
import CloseIcon from "@mui/icons-material/Close";

const serverapiUrl = import.meta.env.VITE_API_URL;

const customColors = {
  primaryLight: "#4a90e2", // Light blue
  primaryDark: "#0033cc", // Dark blue
  white: "#ffffff",
  greyLight: "#f0f0f0",
  greyDark: "#9e9e9e",
  greyDarker: "#616161",
  black: "#000000",
};

const customSidebarColors = {
  background: "#f5f5f5",
  primary: "#4a90e2", // Light blue
  secondary: "#50e3c2", // Light teal
  textPrimary: "#333",
  textSecondary: "#666",
  border: "#ddd",
};

const VisitRequest = () => {
  const { user } = useContext(UserContext);

  const isMdDevices = useMediaQuery("(max-width:920px)");
  const isSmDevices = useMediaQuery("(max-width:600px)");
  const isXsDevices = useMediaQuery("(max-width:380px)");

  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedVisits, setSelectedVisits] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);

  const getVisitRequestData = async () => {
    try {
      const response = await fetch(
        `${serverapiUrl}/visitBooking/ownerVisit/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const visitRequestsData = data.visitRequestsData;

      // Map visitRequestsData to FullCalendar events
      const events = visitRequestsData.map((visit) => ({
        id: visit._id,
        pgName: `${visit.pgId.pgName}`,
        renterName: `${visit.renterId.userName}`,
        renterMobileNo: `${visit.renterId.mobileNo}`,
        renterEmailId: `${visit.renterId.email}`,
        start: visit.visitDate,
        time: visit.visitTime,
        allDay: visit.visitTime, // Set to false to show time-specific events
        extendedProps: {
          time: visit.visitTime,
          pgName: visit.pgId.pgName,
          renterName: visit.renterId.userName,
          visitMessage: visit.visitMessage,
        },
      }));

      setCurrentEvents(events);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVisitRequestData();
  }, []);

  // Function to handle clicking on a date
  const handleDateClick = (info) => {
    const visitsOnDate = currentEvents.filter(
      (event) => event.start === info.dateStr
    );
    setSelectedVisits(visitsOnDate);
    setOpen(true);
  };

  // Function to handle clicking on an event
  const handleEventClick = (info) => {
    const eventId = info.event.id;
    const selectedEvent = currentEvents.find((event) => event.id === eventId);
    setSelectedVisits([selectedEvent]); // Set the selected event to show details
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="Visit Request" subtitle=" " />

      <Box display="flex" justifyContent="space-between" gap={2}>
        {/* CALENDAR SIDEBAR */}
        <Box
          display={`${isMdDevices ? "none" : "block"}`}
          flex="1 1 20%"
          p="15px"
          borderRadius="8px"
          bgcolor={customSidebarColors.background}
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color={customSidebarColors.primary}
            mb="10px"
          >
            Events
          </Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  my: "10px",
                  borderRadius: "8px",
                  bgcolor: customSidebarColors.white,
                  border: `1px solid ${customSidebarColors.border}`,
                  p: "12px",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <>
                      <Typography
                        variant="h6"
                        color={customSidebarColors.textPrimary}
                        fontWeight="bold"
                      >
                        {event.pgName}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={customSidebarColors.textPrimary}
                      >
                        {event.renterName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={customSidebarColors.textSecondary}
                      >
                        {event.renterEmailId}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={customSidebarColors.textSecondary}
                      >
                        {event.renterMobileNo}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color={customSidebarColors.primary}
                    >
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      {event.time}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              // timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: `${isSmDevices ? "prev,next" : "prev,next today"}`,
              center: "title",
              right: `${
                isXsDevices
                  ? ""
                  : isSmDevices
                  ? "dayGridMonth,listMonth"
                  : "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
              }`,
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            dateClick={handleDateClick} // Handle click on a date
            eventClick={handleEventClick} // Handle click on an event
            events={currentEvents} // Display events fetched from the server
            eventContent={(eventInfo) => (
              <Box>
                <Typography color="blue">
                  {eventInfo.event.extendedProps.pgName}
                </Typography>
                <Typography>{eventInfo.event.extendedProps.time}</Typography>
              </Box>
            )}
          />
        </Box>
      </Box>

      {/* MODAL TO SHOW VISIT DETAILS */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: `linear-gradient(135deg, ${customColors.primaryLight}, ${customColors.primaryDark})`,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            color: customColors.white,
          },
        }}
      >
        <DialogTitle
          sx={{
            position: "relative",
            fontWeight: "bold",
            color: customColors.white,
          }}
        >
          Visit Details
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              backgroundColor: customColors.greyDark,
              "&:hover": {
                backgroundColor: customColors.greyDarker,
              },
              color: customColors.white,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedVisits.length > 0 ? (
            <List sx={{ padding: "0 8px" }}>
              {selectedVisits.map((visit) => (
                <ListItem
                  key={visit.id}
                  sx={{
                    backgroundColor: customColors.white,
                    borderRadius: "12px",
                    marginBottom: "12px",
                    padding: "12px 16px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          variant="h6"
                          color={customColors.black}
                          fontWeight="bold"
                        >
                          PG: {visit.extendedProps.pgName}
                        </Typography>
                        <Typography
                          variant="h6"
                          color={customColors.black}
                          fontWeight="bold"
                        >
                          Renter: {visit.extendedProps.renterName}
                        </Typography>
                        <Typography
                          variant="h6"
                          color={customColors.black}
                          fontWeight="bold"
                        >
                          Date:{" "}
                          {formatDate(visit.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                        <Typography
                          variant="h6"
                          color={customColors.black}
                          fontWeight="bold"
                        >
                          Time: {visit.extendedProps.time}
                        </Typography>
                      </>
                    }
                    secondary={
                      <Typography variant="body2" color={customColors.greyDark}>
                        Message: {visit.extendedProps.visitMessage}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              variant="body1"
              color={customColors.greyDarker}
              textAlign="center"
              sx={{
                padding: "20px 0",
                fontWeight: "bold",
                color: "white",
              }}
            >
              No Visit on this day
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VisitRequest;
