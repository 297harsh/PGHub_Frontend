import { useState, useEffect, useContext , useCallback} from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Grid, Box, useTheme, Backdrop, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../../../context/UserData";
import { Header } from "../../../components";
import { tokens } from "../../../theme";

import BasicDetails from "./part/BasicDetails";
import BasicDetails_2 from "./part/BasicDetails_2";
import RoomAmenities from "./part/RoomAmenities";
import Charges from "./part/Charges";
import RoomDetails from "./part/RoomDetails";
import Rule from "./part/Rule";

const serverapiUrl = import.meta.env.VITE_API_URL;

export default function UpdatePgDetails() {
  const { pgId } = useParams();
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formValues, setFormValues] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchPgData = async () => {
      if (!pgId) {
        toast.error("Error in fetching pg data.");
        return;
      }

      try {
        const response = await fetch(`${serverapiUrl}/owner/pg/getData/${pgId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Fetched PG data successfully.");
          setFormValues(data.pgDetails);
          setSelectedImages(data.pgDetails.images)
        } else {
          toast.error(data.message || "Internal error, please try again later.");
        }
      } catch (err) {
        toast.error(`Fetch failed: ${err.message}`);
      }
    };

    fetchPgData();
  }, []);

  useEffect(() => {
    console.log(formValues)
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (name == "foodAvailable" && value === "No") {
      setFormValues((formValues) => ({
        ...formValues,
        foodOptions: [],
        foodType: [],
        mealsProvided: [],
        foodCharges: "",
        foodChargesAmount: "",
      }));
    }

    if (name == "foodCharges" && value === "Included in Rent") {
      setFormValues((formValues) => ({
        ...formValues,
        foodChargesAmount: "",
      }));
    }
  };

  const handleCheckboxChange = useCallback(
    (e, key, value) => {
      const updatedArray = e.target.checked
        ? [...formValues[key], value]
        : formValues[key].filter((item) => item !== value);

      setFormValues((prevValues) => ({
        ...prevValues,
        [key]: updatedArray,
      }));
    },
    [formValues]
  );

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevValues) => [...prevValues, ...files]);
  }, []);

  const handleRemoveImage = useCallback((index) => {
    setSelectedImages((prevValues) => {
      if (index >= 0 && index < prevValues.length) {
        return prevValues.filter((_, i) => i !== index);
      }
      return prevValues; // Return unchanged if index is out of bounds
    });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("update");
      console.log(`${serverapiUrl}/owner/pg/registerPg`);
      const response = await fetch(`${serverapiUrl}/owner/pg/update/${pgId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formValues }),
      });

      const data = await response.json();

      if (data.success && data.savedPg) {
        toast.success("PG Data Update successfully!");
        setTimeout(() => {
          navigate("/owner/registeredPgs");
        }, 3000);
      }
      else {
        toast.error(data.message || "Internal error, please try again later.");
      }
    } catch (err) {
      toast.error("Failed to Update PG Data");
      // toast.error("Failed to register PG: " + err.message);
    }
  };

  if (formValues == null) {
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

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Update" subtitle="Update Pg Details" />
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Routes>
            <Route
              path=""
              element={
                <BasicDetails
                  formValues={formValues}
                  handleChange={handleChange}
                  colors={colors}
                  path={`/owner/updatepgdetails/${pgId}/basic`}
                />
              }
            />
            <Route
              path="/basic"
              element={
                <BasicDetails_2
                  formValues={formValues}
                  handleChange={handleChange}
                  colors={colors}
                  path={`/owner/updatepgdetails/${pgId}/roomAmenities`}
                />
              }
            />
            <Route
              path="/roomAmenities"
              element={
                <RoomAmenities
                  formValues={formValues}
                  handleChange={handleChange}
                  colors={colors}
                  path={`/owner/updatepgdetails/${pgId}/roomDetails`}

                />
              }
            />
            <Route
              path="/roomDetails"
              element={
                <RoomDetails
                  formValues={formValues}
                  setFormValues={setFormValues}
                  handleChange={handleChange}
                  handleRemoveImage={handleRemoveImage}
                  handleImageChange={handleImageChange}
                  colors={colors}
                  path={`/owner/updatepgdetails/${pgId}/charges`}

                />
              }
            />
            <Route
              path="/charges"
              element={
                <Charges
                  formValues={formValues}
                  handleChange={handleChange}
                  colors={colors}
                  path={`/owner/updatepgdetails/${pgId}/rule`}

                />
              }
            />
            <Route
              path="/rule"
              element={
                <Rule
                  formValues={formValues}
                  setFormValues={setFormValues}
                  handleChange={handleChange}
                  colors={colors}
                />
              }
            />
          </Routes>
        </Grid>
      </form>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Box>
  );
}
