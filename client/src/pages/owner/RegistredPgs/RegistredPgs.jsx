import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "../../../components";
import DeleteDialog from "./DeleteDialog";
import PGList from "./PGList";
import { UserContext } from "../../../context/UserData";

const serverapiUrl = import.meta.env.VITE_API_URL;

const RegisteredPGPage = () => {
  const { user } = useContext(UserContext);
  const [pgList, setPgList] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPG, setSelectedPG] = useState(null);

  const navigate = useNavigate();

  const fetchAllOwnerPgs = async () => {
    try {
      const response = await fetch(`${serverapiUrl}/owner/pg/allPg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerEmail: user.email }),
      });

      const data = await response.json();
      if (data.success) {
        setPgList(data.pgDetails || []);
        toast.success("PGs data fetched successfully");
      } else {
        toast.error(data.message || "Failed to fetch PGs. Please try again.");
      }
    } catch (err) {
      toast.error(`Error fetching PGs: ${err.message}`);
    }
  };

  const handleView = (pgId) => navigate(`/owner/viewpgdetails/${pgId}`);
  const handleUpdate = (pgId) => navigate(`/owner/updatepgdetails/${pgId}`);

  const handleDelete = (pg) => {
    setSelectedPG(pg);
    setShowDeleteDialog(true);
  };

  const handleClose = () => setShowDeleteDialog(false);

  const handleConfirmDelete = async () => {
    if (!selectedPG) return;
    console.log("hii")
    console.log(selectedPG)

    try {
      const response = await fetch(
        `${serverapiUrl}/owner/pg/deletePg/${selectedPG}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pgId: selectedPG }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setPgList(pgList.filter((pg) => pg._id !== selectedPG));
        toast.success("PG successfully deleted");
      } else {
        toast.error(data.message || "Failed to delete PG. Please try again.");
      }
    } catch (err) {
      toast.error(`Failed to delete PG: ${err.message}`);
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    fetchAllOwnerPgs();
  }, [user.email]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Registered PGs" subtitle="Your PGs" />
      </Box>

      {pgList.length === 0 ? (
        <Box
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="top"
          color="black"
          height="100vh"
          fontSize="30px"
        >
          {pgList.length === 0 ? (
            "No PG Registered"
          ) : (
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
          )}
        </Box>
      ) : (
        <PGList
          pgList={pgList}
          onView={handleView}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onImageClick={setSelectedPG} // Assuming this is used somewhere
        />
      )}

      {showDeleteDialog && (
        <DeleteDialog
          open={showDeleteDialog}
          onClose={handleClose}
          onConfirm={handleConfirmDelete}
        />
      )}

      <ToastContainer position="bottom-right" autoClose={2000} />
    </Box>
  );
};

export default RegisteredPGPage;
