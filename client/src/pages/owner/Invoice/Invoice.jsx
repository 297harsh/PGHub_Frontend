import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserData";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Payment,
  Email,
  Phone,
  Home,
  Bed,
  AccountCircle,
  AttachMoney,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { Header } from "../../../components";

const serverapiUrl = import.meta.env.VITE_API_URL;

export default function Invoice() {
  const { user } = useContext(UserContext);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const columns = [
    { field: "id", headerName: "Payment ID" },
    { field: "pgName", headerName: "PG Name", flex: 1 },
    { field: "renterEmail", headerName: "Renter Email", flex: 1 },
    { field: "renterPhone", headerName: "Renter Phone", flex: 1 },
    {
      field: "rent",
      headerName: "Rent",
      flex: 1,
      renderCell: (params) => <>₹{params.row.rent}</>,
    },
    { field: "paymentDate", headerName: "Payment Date", flex: 1 },
    { field: "paymentStatus", headerName: "Payment Status", flex: 1 },
  ];

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch(
        `${serverapiUrl}/payment/getOwnerPayment/${user._id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const rowsWithId = data.paymentList.map((item) => ({
        id: item._id,
        pgName: item.pgId.pgName,
        renterName: item.renterId.userName,
        renterEmail: item.renterId.email,
        renterPhone: item.renterId.mobileNo,
        rent: item.booking.rent,
        numbedbook: item.booking.numbedbook,
        typesOfRoom: item.booking.typesOfRoom,
        deposit: item.booking.deposit,
        depositAmount: item.booking.depositAmount,
        totalAmount: item.booking.totalAmount,
        paymentDate: item.paymentDate,
        paymentStatus: item.paymentStatus,
        paymentId: item.paymentId,
      }));

      setPaymentDetails(rowsWithId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const handleRowClick = (params) => {
    setSelectedPayment(params.row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="INVOICES" subtitle="List of Invoice Balances" />
      </Box>
      <Box
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
            padding: "12px",
            "&:hover": {
              backgroundColor: "#f1f5f8",
            },
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid #e0e0e0",
            bgcolor: "#e3f2fd",
          },
          "& .MuiDataGrid-virtualScroller": {
            bgcolor: "#fafafa",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          rows={paymentDetails}
          columns={columns}
          checkboxSelection
          onRowClick={handleRowClick}
        />
      </Box>

      {selectedPayment && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{
              bgcolor: "#1976d2",
              color: "#fff",
              textAlign: "center",
              fontSize: "1.25rem",
            }}
          >
            Payment Details
          </DialogTitle>
          <DialogContent sx={{ padding: "24px", backgroundColor: "#f7f9fc" }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Home sx={{ color: "#1976d2" }} />
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>PG Name:</strong> {selectedPayment.pgName}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AccountCircle sx={{ color: "#1976d2" }} />
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Renter Name:</strong> {selectedPayment.renterName}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Email sx={{ color: "#1976d2" }} />
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Email:</strong> {selectedPayment.renterEmail}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Phone sx={{ color: "#1976d2" }} />
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Phone:</strong> {selectedPayment.renterPhone}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Bed sx={{ color: "#1976d2" }} />
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Room Type:</strong> {selectedPayment.typesOfRoom}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Beds Booked:</strong> {selectedPayment.numbedbook}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AttachMoney sx={{ color: "#1976d2" }} />
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Bed Rent:</strong> ₹{selectedPayment.rent}/month
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Deposit:</strong> {selectedPayment.deposit}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Deposit Amount:</strong> ₹
                {selectedPayment.depositAmount}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Total Amount:</strong> ₹{selectedPayment.totalAmount}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Payment Date:</strong>{" "}
                {new Date(selectedPayment.paymentDate).toLocaleDateString(
                  "en-GB",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  }
                )}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Payment ID:</strong> {selectedPayment.paymentId}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Payment sx={{ color: "#1976d2" }} />
              <Typography variant="body1" sx={{ color: "#455a64" }}>
                <strong>Status:</strong> {selectedPayment.paymentStatus}
              </Typography>
            </Box>
            
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
