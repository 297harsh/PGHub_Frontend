import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserData";
import { useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import RoomSquareCard from "./RoomSquareCard";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { CirculerProcess } from "../../../components";

const serverapiUrl = import.meta.env.VITE_API_URL;

export default function BookRoom() {
  const { user } = useContext(UserContext);
  const { pgId } = useParams();
  const [pgData, setPgData] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedBeds, setSelectedBeds] = useState(0);
  const [orderId, setOrderId] = useState("");
  // 2039a61568c5
  let order = 0;
  let cashfree;

  const handleCardClick = (roomType) => {
    setSelectedRoomType(roomType);
    setSelectedBeds(0);
  };

  const handleIncrease = () => {
    if (
      selectedRoomType &&
      pgData.remainRoom[selectedRoomType].numOfBed - selectedBeds > 0
    ) {
      setSelectedBeds((prevCount) => prevCount + 1);
    }
  };

  const handleDecrease = () => {
    if (selectedRoomType && selectedBeds > 0) {
      setSelectedBeds((prevCount) => prevCount - 1);
    }
  };

  const calculatePrice = () => {
    if (selectedRoomType) {
      return pgData.roomInfo[selectedRoomType].RentOfBed * selectedBeds;
    }
    return 0;
  };

  const getPgDetails = async () => {
    if (!pgId) {
      alert("Pg Not Found.");
      return;
    }
    try {
      const response = await axios.get(`${serverapiUrl}/pgDetails/pg/${pgId}`);
      const data = response.data;
      if (data.success) {
        setPgData(data.pgDetails);
      } else {
        alert(`${data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const savePaymentDetails = async (amount, paymentId, status, payDate) => {
    try {
      const userPayData = {
        renterId: user._id,
        ownerId: pgData.ownerId,
        pgId: pgData._id,
        booking: {
          typesOfRoom: selectedRoomType,
          numbedbook: selectedBeds,
          rent: pgData.roomInfo[selectedRoomType].RentOfBed,
          deposit: pgData.deposit,
          depositAmount: pgData.depositAmount,
          totalAmount: amount,
        },
        paymentId: paymentId,
        paymentStatus: status,
        paymentDate: payDate,
      };

      const response = await axios.post(`${serverapiUrl}/payment/save`, {
        paymentData: userPayData,
      });

      const data = response.data;
      if (data.success) {
        alert("success save")
      } 
      else {
        alert(`${data.message}`);
      }
      console.log(k);
    } catch (err) {
      console.log(err);
    }
  };

  let initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  initializeSDK();

  const getSessionId = async () => {
    try {
      const totalAmount = await calculatePrice();
      let payedTotalAmount;
      if (pgData.deposit == "Require") {
        payedTotalAmount = totalAmount + pgData.depositAmount;
      } else {
        payedTotalAmount = totalAmount;
      }

      let res = await axios.get(`${serverapiUrl}/payment/bookPg`, {
        params: {
          userId: user._id,
          mobileNo: user.mobileNo,
          email: user.email,
          userName: user.userName,
          pgId: pgData._id,
          amount: payedTotalAmount,
          // amount: totalAmount,
        },
      });

      if (res.data && res.data.payment_session_id) {
        // console.log("res.data.order_id ", res.data.order_id);
        order = res.data.order_id;

        setOrderId(res.data.order_id);

        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async () => {
    try {
      // console.log("Payment ");

      let res = await axios.post(`${serverapiUrl}/payment/verify`, {
        orderId: orderId || order,
      });

      if (res && res.data) {
        // console.log("res.data");
        // console.log(res.data);
        if (res.data[0].payment_status === "SUCCESS") {
          // console.log("Payment verified successfully");
          await savePaymentDetails(
            res.data[0].payment_amount,
            res.data[0].cf_payment_id,
            res.data[0].payment_status,
            res.data[0].payment_completion_time
          ); // Function to save payment
        } else {
          console.error("Payment verification failed:", res.data);
        }
      }
    } catch (error) {
      console.error("Payment verification error:", error);
    }
  };

  const handlePay = async (e) => {
    e.preventDefault();
    try {
      let sessionId = await getSessionId();
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((res) => {
        // console.log("=======================");
        // console.log(res);
        verifyPayment();
        // if (res.status === "SUCCESS") {
        //   verifyPayment();
        // }
        // else {
        //   console.error("Payment failed", res);
        // }
      });
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  useEffect(() => {
    getPgDetails();
  }, []);

  if (!pgData) {
    return <CirculerProcess />;
  }

  return (
    <>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: 5,
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img
              src={pgData.images[0]}
              alt="PG Property"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Box mt={2}>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {pgData.pgName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {pgData.address}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Owner: Walter White
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Email: {pgData.ownerEmail}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ marginBottom: 4 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ marginBottom: 2, color: "#41a5a9" }}
              >
                Room Details
              </Typography>
              <Grid container spacing={2}>
                {Object.keys(pgData.roomInfo).map((roomType) => (
                  <Grid item xs={12} sm={6} md={4} key={roomType}>
                    <RoomSquareCard
                      roomType={roomType}
                      RentOfBed={pgData.roomInfo[roomType].RentOfBed}
                      numOfBed={pgData.roomInfo[roomType].numOfBed}
                      remainNumOfRoom={pgData.remainRoom[roomType].numOfBed}
                      selected={selectedRoomType === roomType}
                      handleCardClick={handleCardClick}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Bed Selector */}
            <Box sx={{ marginTop: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Beds
                  </Typography>

                  <IconButton
                    onClick={handleDecrease}
                    aria-label="decrease"
                    size="small"
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "rgba(65, 165, 169, 0.1)",
                      },
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography variant="body2" sx={{ mx: 1 }}>
                    {selectedBeds}
                  </Typography>

                  <IconButton
                    onClick={handleIncrease}
                    aria-label="increase"
                    size="small"
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "rgba(65, 165, 169, 0.1)",
                      },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* Price and Deposit */}
            <Box
              sx={{
                marginTop: 4,
                padding: 2,
                backgroundColor: "#f1f1f1",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Price for {selectedBeds} Bed{selectedBeds > 1 ? "s" : ""}:
              </Typography>
              <TextField
                variant="outlined"
                value={`₹${calculatePrice()}`}
                sx={{
                  marginBottom: 2,
                  width: "15%",
                  "&:hover": {
                    borderColor: "#41a5a9",
                    backgroundColor: "rgba(65, 165, 169, 0.1)",
                  },
                  transition: "border-color 0.3s, background-color 0.3s",
                }}
              />

              <Typography variant="h6" gutterBottom>
                Deposit:
              </Typography>
              <Typography
                sx={{
                  width: "15%",
                  border: "1px solid #c4c4c4",
                  padding: "10px",
                  borderRadius: "4px",
                  "&:hover": {
                    borderColor: "#41a5a9",
                    backgroundColor: "rgba(65, 165, 169, 0.1)",
                  },
                  transition: "border-color 0.3s, background-color 0.3s",
                }}
              >
                {pgData.deposit === "Require"
                  ? `₹${pgData.depositAmount}`
                  : pgData.deposit}
              </Typography>
            </Box>

            <Box textAlign="left" mt={5}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePay}
                sx={{
                  padding: "10px 20px",
                  backgroundColor: "#41a5a9",
                  "&:hover": {
                    backgroundColor: "#379a8f",
                  },
                }}
              >
                Pay Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
