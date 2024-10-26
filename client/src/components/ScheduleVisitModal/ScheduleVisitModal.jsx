import { useState, useContext } from "react";
import { UserContext } from "../../context/UserData";
import dayjs from "dayjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serverapiUrl = import.meta.env.VITE_API_URL;

const ScheduleVisitModal = ({ openModal, handleScheduleClose, pgData }) => {
  const { user } = useContext(UserContext);

  const [visitMessage, setVisitMessage] = useState("");
  const [visitDate, setVisitDate] = useState(dayjs());
  const [visitTime, setVisitTime] = useState(dayjs());
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSchedule = async () => {
    if (!user) {
      toast.error("Please Login");
      handleScheduleClose();
      return;
    }
    const selectedDateTime = visitDate
      .hour(visitTime.hour())
      .minute(visitTime.minute());

    const currentDateTime = dayjs();

    // Check if the selected date is today or earlier
    if (visitDate.isSame(currentDateTime, "day")) {
      toast.error(
        "You cannot schedule a visit for today. Please choose a future date."
      );
      return;
    }

    // Check if the selected date and time are in the past
    if (selectedDateTime.isBefore(currentDateTime)) {
      toast.error("You cannot schedule a visit for a past date or time.");
      return;
    }
    const visitData = {
      ownerId: pgData.ownerId,
      renterId: user._id,
      pgId: pgData._id,
      visitTime: visitTime.format("hh:mm A"),
      visitDate: visitDate.format("YYYY-MM-DD"),
      visitMessage,
    };

    try {
      const response = await fetch(`${serverapiUrl}/visitBooking/newVisit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitData }),
      });
      if (response.status === 201) {
        const data = await response.json();
        if (data.success) {
          toast.success("Visit Scheduled successfully!");
          handleScheduleClose();
        }
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  // Get current date and time
  const currentDateTime = dayjs();

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleScheduleClose}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <DialogTitle>Schedule a Visit</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography fullWidth>PG name: {pgData.pgName}</Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={visitDate}
                minDate={currentDateTime} // Prevents selecting past dates
                onChange={(newValue) => setVisitDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Select Time"
                value={visitTime}
                minTime={
                  visitDate.isSame(currentDateTime, "day")
                    ? currentDateTime
                    : null
                } // Prevents selecting past times if the date is today
                onChange={(newValue) => setVisitTime(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              label="Message"
              type="text"
              value={visitMessage}
              onChange={(e) => setVisitMessage(e.target.value)}
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              }
              label={
                <span>
                  I agree to the{" "}
                  <Link href="/terms-and-conditions" target="_blank">
                    Terms & Conditions
                  </Link>
                </span>
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScheduleClose}>Cancel</Button>
          <Button onClick={handleSchedule}>Schedule</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScheduleVisitModal;
