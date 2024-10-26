import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer, toast } from "react-toastify";


const SearchBar = ({onSearch}) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = () => {
    if (searchCity=="" || searchCity==undefined || searchCity==null ){
      toast.error("please enter city name");
      return 
    }
    onSearch(searchCity);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >

      <TextField
        variant="outlined"
        placeholder="Search City..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginRight: "10px", width: "300px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
