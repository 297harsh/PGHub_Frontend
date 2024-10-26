import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Switch,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Header,
  Slider,
  Amenities,
  Map,
  ReviewCard,
  ScheduleVisitModal,
} from "../../../components";
import RoomSquareCard from "./RoomSquareCard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const serverapiUrl = import.meta.env.VITE_API_URL;
export default function PgDetails() {
  const { pgId } = useParams();
  const navigate = useNavigate();
  const [pgData, setPgData] = useState(null);

  //
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [occupancy, setOccupancy] = useState("");
  // const [visitDate, setVisitDate] = useState(dayjs());
  // const [visitTime, setVisitTime] = useState(dayjs());
  // const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  // const [termsAccepted, setTermsAccepted] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  // const images = [
  //   "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1554802583/Website/Residences/Chicago/1.jpg",
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYMjzfSgvd_MmHnSnzBibNsNXUhGb57yOKA&s",
  //   "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1554802588/Website/Residences/Boston/2.jpg",
  //   "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   "https://images.pexels.com/photos/276625/pexels-photo-276625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // ];

  const getPgDetails = async () => {
    if (!pgId) {
      alert("Pg Not Found.");
      return;
    }
    try {
      const response = await fetch(`${serverapiUrl}/pgDetails/pg/${pgId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data.pgDetails);

      if (data.success) {
        // toast.success("Fetched PG data successfully.");
        setPgData(data.pgDetails);
      } else {
        // toast.error(data.message || "Internal error, please try again later.");
        alert(`${data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPgDetails();
  }, []);

  const dummyRatings = [
    {
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
      description: "Great place to stay! Highly recommended.",
      rating: 4.5,
      time: "3 years ago",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      description: "Nice and clean, but a bit noisy at night.",
      rating: 4.0,
      time: "2 months ago",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Sam Wilson",
      description: "Friendly staff and good amenities.",
      rating: 4.2,
      time: "3 years ago",
    },
  ];

  const handleScheduleOpen = () => {
    setOpenModal(true);
  };

  const handleScheduleClose = () => {
    setOpenModal(false);
  };

  const handleBook = () => {
    console.log("Booking initiated");

    navigate(`/bookRoom/${pgId}`);
  };

  if (pgData == null) {
    return (
      <Box m="20px">
        <Box
          height="100vh"
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Backdrop
            sx={{
              color: "#41a5a9",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "80%",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              bgcolor: "inherit",
            }}
            open={true}
          >
            <CircularProgress sx={{ color: "#7a5af5" }} />
          </Backdrop>
        </Box>
      </Box>
    );
  }

  const displayValue = (value, amount) => {
    if (value === "Included in Rent") return "Included in Rent";
    if (value === "Not Included in Rent") return `₹${amount}/month  `;
    if (value === "Require") return `₹${amount}`;
    if (value === "Not Require") return `NA`;
    return "-";
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "95%" },
        margin: "30px auto",
        backgroundColor: "#fff",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        padding: { xs: "10px", sm: "20px" },
      }}
    >
      <Grid
        container
        spacing={0}
        alignItems="center"
        sx={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} sm={8}>
          <Header
            title={pgData.pgName}
            subtitle={`${pgData.pgAddress},${pgData.city}`}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ textAlign: { xs: "left", sm: "right" } }}
        >
          <Chip
            label={`Operating since ${pgData.operatingSince}`}
            variant="outlined"
            sx={{
              borderColor: "#378386",
              color: "#378386",
              fontWeight: "500",
              fontSize: "14px",
              fontFamily: '"Roboto", sans-serif',
              padding: "5px 10px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#378386",
                color: "#fff",
                borderColor: "#378386",
              },
            }}
          />
        </Grid>
      </Grid>

      {/* images */}
      <Box>
        <Slider images={pgData.images} />
      </Box>

      {/* Details */}
      <Box sx={{ margin: { xs: "10px", sm: "20px" }, textAlign: "left" }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: "24px",
            fontFamily: '"Source Sans Pro", sans-serif',
            textTransform: "capitalize",
            color: "#378386",
            marginBottom: "10px",
          }}
        >
          Details of {pgData.pgName}
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          {pgData.summary}
        </Typography>
      </Box>

      {/* gender suitable for */}
      <Box sx={{ margin: { xs: "10px", sm: "20px" }, textAlign: "left" }}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          sx={{ marginBottom: "20px", display: "flex", flexWrap: "wrap" }}
        >
          {/* Gender */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                fontFamily: '"Source Sans Pro", sans-serif',
                textTransform: "capitalize",
                color: "#378386",
                marginBottom: "10px",
              }}
            >
              Accommodation for:
            </Typography>
            <Amenities amenities={pgData.gender} />
          </Grid>

          {/* Suitable For */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                fontFamily: '"Source Sans Pro", sans-serif',
                textTransform: "capitalize",
                color: "#378386",
                marginBottom: "10px",
              }}
            >
              Suitable for:
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px", // Adjust the gap as needed
                justifyContent: "flex-start", // Aligns the items to the start of the flex container
              }}
            >
              <Amenities amenities={pgData.suitableFor} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Food */}
      {pgData.foodAvailable == "Yes" && (
        <Box sx={{ margin: { xs: "10px", sm: "20px" }, textAlign: "left" }}>
          <Grid
            container
            spacing={0}
            alignItems="center"
            sx={{ marginBottom: "20px", display: "flex", flexWrap: "wrap" }}
          >
            {/* Food Type */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: "24px",
                  fontFamily: '"Source Sans Pro", sans-serif',
                  textTransform: "capitalize",
                  color: "#378386",
                  marginBottom: "10px",
                }}
              >
                Food Type
              </Typography>
              <Amenities amenities={pgData.foodType} />
            </Grid>

            {/* Food Provided */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: "24px",
                  fontFamily: '"Source Sans Pro", sans-serif',
                  textTransform: "capitalize",
                  color: "#378386",
                  marginBottom: "10px",
                }}
              >
                Food Provided:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px", // Adjust the gap as needed
                  justifyContent: "flex-start", // Aligns the items to the start of the flex container
                }}
              >
                <Amenities amenities={pgData.foodOptions} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Room Details*/}
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            // backgroundColor:"fff000",
            fontSize: "24px",
            fontFamily: '"Source Sans Pro", sans-serif',
            // textTransform: "capitalize",
            color: "#378386",
            marginBottom: "0px", // Decrease space here
            // paddingBottom: "4px", // Adjust padding if necessary
          }}
        >
          Room Detail
        </AccordionSummary>
        <AccordionDetails
          sx={{
            // paddingTop: "4px", // Decrease space here
            transition: "padding 0.3s ease", // Smooth transition for padding
          }}
          transitionprops={{ timeout: 300 }} // Transition effect
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
              width: "100%",
              p: 0,
              m: 0,
            }}
          >
            {/* Display RoomSquareCards */}
            <Grid
              container
              spacing={1}
              sx={{
                width: "100%",
                justifyContent: "left",
              }}
            >
              {Object.keys(pgData.roomInfo).map((roomType) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={roomType}>
                  <RoomSquareCard
                    roomType={roomType}
                    RentOfBed={pgData.roomInfo[roomType].RentOfBed}
                    numOfRoom={pgData.roomInfo[roomType].numOfRoom}
                    numOfBed={pgData.remainRoom[roomType].numOfBed}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/*  */}
      {/* Room Amenities */}
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            // backgroundColor:"fff000",
            fontSize: "24px",
            fontFamily: '"Source Sans Pro", sans-serif',
            // textTransform: "capitalize",
            color: "#378386",
            marginBottom: "0px", // Decrease space here
            // paddingBottom: "4px", // Adjust padding if necessary
          }}
        >
          Room Amenities
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingTop: "4px", // Decrease space here
            transition: "padding 0.3s ease", // Smooth transition for padding
          }}
          transitionprops={{ timeout: 300 }} // Transition effect
        >
          <Amenities amenities={pgData.roomAmenities} />
        </AccordionDetails>
      </Accordion>

      {/* Common Amenities */}
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            // backgroundColor:"fff000",
            fontSize: "24px",
            fontFamily: '"Source Sans Pro", sans-serif',
            // textTransform: "capitalize",
            color: "#378386",
            marginBottom: "0px", // Decrease space here
            // paddingBottom: "4px", // Adjust padding if necessary
          }}
        >
          Common Amenities
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingTop: "4px", // Decrease space here
            transition: "padding 0.3s ease", // Smooth transition for padding
          }}
          transitionprops={{ timeout: 300 }} // Transition effect
        >
          <Amenities amenities={pgData.commonAreaAmenities} />
        </AccordionDetails>
      </Accordion>

      {/* Charges */}
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            // backgroundColor:"fff000",
            fontSize: "24px",
            fontFamily: '"Source Sans Pro", sans-serif',
            // textTransform: "capitalize",
            color: "#378386",
            marginBottom: "0px", // Decrease space here
            // paddingBottom: "4px", // Adjust padding if necessary
          }}
        >
          Charges
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingTop: "4px", // Decrease space here
            transition: "padding 0.3s ease", // Smooth transition for padding
          }}
          transitionprops={{ timeout: 300 }} // Transition effect
        >
          {/*  */}
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Charge</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Value</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pgData.foodAvailable == "Yes" && (
                  <TableRow>
                    <TableCell>Food Charges</TableCell>
                    <TableCell>
                      {displayValue(
                        pgData.foodCharges,
                        pgData.foodChargesAmount
                      )}
                    </TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell>Deposit</TableCell>
                  <TableCell>
                    {displayValue(pgData.deposit, pgData.depositAmount)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maintenance</TableCell>
                  <TableCell>₹{pgData.maintenance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Electricity Charges</TableCell>
                  <TableCell>
                    {displayValue(pgData.electricityCharges)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Water Charges</TableCell>
                  <TableCell>
                    {displayValue(
                      pgData.waterCharges,
                      pgData.waterChargeAmount
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Location */}
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            // backgroundColor:"fff000",
            fontSize: "24px",
            fontFamily: '"Source Sans Pro", sans-serif',
            // textTransform: "capitalize",
            color: "#378386",
            marginBottom: "0px", // Decrease space here
            // paddingBottom: "4px", // Adjust padding if necessary
          }}
        >
          Loaction
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingTop: "4px", // Decrease space here
            transition: "padding 0.3s ease", // Smooth transition for padding
          }}
          transitionprops={{ timeout: 300 }} // Transition effect
        >
          <Box
            sx={{
              margin: { xs: "10px", sm: "20px" },
              textAlign: "left",
              height: "400px",
            }}
          >
            <Map gMapLocation={pgData.gMapLocation} zoomLevel={15} />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Ratings Section */}
      <Box sx={{ padding: { xs: "10px", sm: "20px" }, textAlign: "left" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "24px",
            fontFamily: '"Source Sans Pro", sans-serif',
            textTransform: "capitalize",
            color: "#378386",
            marginBottom: "10px",
          }}
        >
          Ratings & Reviews
        </Typography>
        {dummyRatings.map((rating, index) => (
          <ReviewCard key={index} {...rating} />
        ))}
      </Box>

      {/* Schedule a Visit Modal */}
      {/* <Dialog open={openModal} onClose={handleScheduleClose}>
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
            <TextField
              label="Mobile Number"
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              fullWidth
            />
            <TextField
              label="Occupancy"
              value={occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
              select
              fullWidth
            >
              {["Single", "Double", "Triple"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={visitDate}
                onChange={(newValue) => setVisitDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Select Time"
                value={visitTime}
                onChange={(newValue) => setVisitTime(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControlLabel
              control={
                <Switch
                  checked={whatsappUpdates}
                  onChange={(e) => setWhatsappUpdates(e.target.checked)}
                />
              }
              label="Send Updates via WhatsApp"
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
      </Dialog> */}

      <ScheduleVisitModal
        openModal={openModal}
        handleScheduleClose={handleScheduleClose}
        pgData={pgData}
      />

      {/* Schedule and Book buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleScheduleOpen}
        >
          Schedule a Visit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleBook}>
          Book Now
        </Button>
      </Box>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Box>
  );
}
