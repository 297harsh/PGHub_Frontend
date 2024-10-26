import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const CustomDialog = ({
  openDialog,
  dialogType,
  handleDialogClose,
  handleDialogSubmit,
  newEvent,
  setNewEvent,
  selectedEvent,
}) => {
  return (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      {dialogType === "add" ? (
        <>
          <DialogTitle>Add New Visit Request</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="PG Name"
              type="text"
              fullWidth
              value={newEvent.pgName}
              onChange={(e) =>
                setNewEvent({ ...newEvent, pgName: e.target.value })
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Time</InputLabel>
              <Select
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              >
                <MenuItem value="allDay">All Day</MenuItem>
                <MenuItem value="specific">Specific Time</MenuItem>
              </Select>
            </FormControl>
            {newEvent.time === "specific" && (
              <TextField
                margin="dense"
                label="Specific Time"
                type="time"
                fullWidth
                value={newEvent.specificTime || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, specificTime: e.target.value })
                }
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogSubmit}>Add Request</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>Delete Visit Request</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the event{" "}
              <strong>{selectedEvent?.title}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogSubmit} color="error">
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CustomDialog;
