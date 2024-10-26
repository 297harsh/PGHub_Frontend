import { useState, useEffect, useContext, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Grid, Box, useTheme } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../../../context/UserData";
import { Header, DashNavbar } from "../../../components";
import { tokens } from "../../../theme";

import BasicDetails from "./part/BasicDetails";
import BasicDetails_2 from "./part/BasicDetails_2";
import RoomAmenities from "./part/RoomAmenities";
import Charges from "./part/Charges";
import RoomDetails from "./part/RoomDetails";
import Rule from "./part/Rule";

const serverapiUrl = import.meta.env.VITE_API_URL;

export default function RegisterNewPg() {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);

  const initialFormValues = useCallback(
    () => ({
      ownerId: user._id,
      ownerEmail: user.email,
      pgName: "",
      pgAddress: "",
      city: "",
      state: "",
      zipcode: "",
      gMapLocation: {},
      // gMapLocation: { lat: "22.54109841178252", lng: "73.4447193145752" },
      // images: [],
      operatingSince: "",
      summary: "",
      gender: [],
      suitableFor: [],
      roomAmenities: [],
      commonAreaAmenities: [],
      foodAvailable: "",
      foodOptions: [],
      foodType: [],
      foodCharges: "",
      foodChargesAmount: "",
      roomInfo: {},
      totalRooms: "",
      totalBeds: "",
      isFull: false,
      deposit: "",
      depositAmount: "",
      maintenance: "",
      electricityCharges: "",
      waterCharges: "",
      waterChargeAmount: "",
      houseRules: {
        noticePeriod: "",
        gateClosingTime: "",
        visitorEntry: "",
        nonVegFood: "",
        oppositeGender: false,
        smoking: false,
        drinking: false,
        loudMusic: false,
        party: false,
        pets: false,
      },
      term: true,
    }),
    [user]
  );

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };

      if (name === "foodAvailable" && value === "No") {
        return {
          ...updatedValues,
          foodOptions: [],
          foodType: [],
          mealsProvided: [],
          foodCharges: "",
          foodChargesAmount: "",
        };
      }

      if (name === "foodCharges" && value === "Included in Rent") {
        return {
          ...updatedValues,
          foodChargesAmount: "",
        };
      }

      return updatedValues;
    });
  }, []);

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
      
      const formData = new FormData();

      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      formData.append("formValues", JSON.stringify(formValues));

      const response = await fetch(`${serverapiUrl}/owner/pg/addnewPg`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.newPG) {
        toast.success("PG registered successfully!");
        console.log("PG registered successfully!");
        console.log(data.newPG)
        // setTimeout(() => navigate("/owner"), 3000);
      } else {
        toast.error(data.message || "Internal error, please try again later.");
      }
    } catch (err) {
      toast.error("Failed to register PG");
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="DASHBOARD" subtitle="Register a new Pg" />
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
                  handleCheckboxChange={handleCheckboxChange}
                  colors={colors}
                />
              }
            />
            <Route
              path="/basic"
              element={
                <BasicDetails_2
                  formValues={formValues}
                  handleChange={handleChange}
                  handleCheckboxChange={handleCheckboxChange}
                  colors={colors}
                />
              }
            />
            <Route
              path="/roomAmenities"
              element={
                <RoomAmenities
                  formValues={formValues}
                  handleChange={handleChange}
                  handleCheckboxChange={handleCheckboxChange}
                  colors={colors}
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
                  handleCheckboxChange={handleCheckboxChange}
                  selectedImages={selectedImages}
                  handleRemoveImage={handleRemoveImage}
                  handleImageChange={handleImageChange}
                  colors={colors}
                />
              }
            />
            <Route
              path="/charges"
              element={
                <Charges
                  formValues={formValues}
                  handleChange={handleChange}
                  handleCheckboxChange={handleCheckboxChange}
                  colors={colors}
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
                  handleCheckboxChange={handleCheckboxChange}
                  handleRemoveImage={handleRemoveImage}
                  handleImageChange={handleImageChange}
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
