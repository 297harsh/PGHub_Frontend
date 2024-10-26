import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PGCard, Filter, SearchBar } from "../../../components";
import MapComponent from "./MapComponent";

const serverapiUrl = import.meta.env.VITE_API_URL;

export default function SearchPG() {
  const navigate = useNavigate();
  const { city } = useParams();
  const [pgList, setPgList] = useState([]);
  const [filteredPgList, setFilteredPgList] = useState([]);
  const [filteredPgLocation, setFilteredPgLocation] = useState([]);

  const [filters, setFilters] = useState({
    locality: "",
    gender: "",
    priceRange: [0, 10000],
    occupancy: "",
    selectedAmenities: [],
    sortBy: "",
  });

  //
  const handleSelect = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  // for Price
  const handleMinPriceChange = (value) => {
    const newMinPrice = Number(value);
    const [currentMin, currentMax] = filters.priceRange;

    if (newMinPrice <= currentMax) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        priceRange: [newMinPrice, currentMax],
      }));
    } else {
      toast.error("Minimum price cannot be greater than maximum price.");
    }
  };

  const handleMaxPriceChange = (value) => {
    const newMaxPrice = Number(value);
    const [currentMin] = filters.priceRange;

    if (newMaxPrice >= currentMin) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        priceRange: [currentMin, newMaxPrice],
      }));
    } else {
      toast.error("Maximum price cannot be less than minimum price.");
    }
  };

  // For Amenities
  const handleAmenitiesChange = (value) => {
    setFilters((prevFilters) => {
      const updatedAmenities = prevFilters.selectedAmenities.includes(value)
        ? prevFilters.selectedAmenities.filter((amenity) => amenity !== value)
        : [...prevFilters.selectedAmenities, value];

      return {
        ...prevFilters,
        selectedAmenities: updatedAmenities,
      };
    });
  };

  // detect filter change
  const isFilterChanged = () => {
    return (
      filters.locality !== "" ||
      filters.gender !== "" ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 10000 ||
      filters.occupancy !== "" ||
      filters.selectedAmenities.length > 0 ||
      filters.sortBy !== ""
    );
  };

  // reset All filter
  const handleRemoveAllFilters = () => {
    setFilters({
      locality: "",
      gender: "",
      priceRange: [0, 10000],
      occupancy: "",
      selectedAmenities: [],
      sortBy: "",
    });
  };

  // remove selected filter
  const handleRemoveFilter = (type, value) => {
    switch (type) {
      case "locality":
        handleSelect("locality", "");
        break;
      case "gender":
        handleSelect("gender", "");
        break;
      case "occupancy":
        handleSelect("occupancy", "");
        break;
      case "amenities":
        handleAmenitiesChange(value);
        break;
      case "priceRange":
        handleSelect("priceRange", [0, 10000]);
        break;
      case "sortBy":
        handleSelect("sortBy", "");
        break;

      default:
        break;
    }
  };

  // Fetch PG Data relayed to City
  const searchByCity = async () => {
    if (!city) {
      toast.error("Please enter a city to search.");
      return;
    }

    try {
      const response = await fetch(
        `${serverapiUrl}/pgDetails/searchbyCity/${city}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data.pgDetails);

      if (data.success) {
        // console.log(data.pgDetails)
        toast.success("Fetched PG data successfully.");
        setPgList(data.pgDetails);
        setFilteredPgList(data.pgDetails);
        setFilteredPgLocation(data.pgDetails.map((pg) => pg.gMapLocation));
      } else {
        toast.error(data.message || "Internal error, please try again later.");
      }
    } catch (err) {
      toast.error(`Fetch failed: ${err.message}`);
    }
  };

  useEffect(() => {
    searchByCity();
  }, [city]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const onSearch = debounce((searchCity) => {
    navigate(`/searchpg/${searchCity}`);
  }, 300);

  const handleCardClick = (id) => {
    navigate(`/pgDetails/${id}`);
  };

  const handleFilterChange = (filters) => {
    let filteredList = pgList;
    if (filters.gender) {
      filteredList = filteredList.filter((pg) => {
        if (filters.gender === "Unisex") {
          return pg.gender.includes("Boys") && pg.gender.includes("Girls");
        }
        return pg.gender.includes(filters.gender);
      });
    }

    // Apply selectedAmenities filter
    if (filters.selectedAmenities) {
      filteredList = filteredList.filter((pg) => {
        const allAmenities = [...pg.roomAmenities, ...pg.commonAreaAmenities];
        return filters.selectedAmenities.every((amenity) =>
          allAmenities.includes(amenity)
        );
      });
    }

    //Apply occupancy filter
    if (filters.occupancy) {
      filteredList = filteredList.filter((pg) => {
        const normalizedOccupancy = filters.occupancy.toLowerCase();
        return pg.roomInfo[normalizedOccupancy] !== undefined;
      });
    }

    // Price
    if (filters.priceRange != [0] || filters.priceRange[1] != 10000) {

      filteredList = filteredList.filter((pg) => {
        return Object.values(pg.roomInfo).some((room) => {
          const rentOfBed = parseFloat(room.RentOfBed);
          return (
            rentOfBed >= filters.priceRange[0] &&
            rentOfBed <= filters.priceRange[1]
          );
        });
      });
    }

    setFilteredPgList(filteredList);
  };

  useEffect(() => {
    handleFilterChange(filters);
  }, [filters]);

  useEffect(() => {
    setFilteredPgLocation(filteredPgList.map((pg) => pg.gMapLocation));
  }, [filteredPgList]);

  return (
    <Box bgcolor="white">
      <Box>
        <Grid
          container
          spacing={2}
          sx={{ padding: 2, marginl: 4, marginr: 4 }}
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <h2>
              Search results for <b>{city}</b> city
            </h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <SearchBar onSearch={onSearch} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Filter
          filters={filters}
          setFilter={handleSelect}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          handleAmenitiesChange={handleAmenitiesChange}
          isFilterChanged={isFilterChanged}
          handleRemoveAllFilters={handleRemoveAllFilters}
          handleRemoveFilter={handleRemoveFilter}
        />
      </Box>

      <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {filteredPgList.map((PGData, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PGCard PGData={PGData} onClick={handleCardClick} />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "top",
            }}
          >
            {filteredPgLocation.length > 0 ? (
              <MapComponent locations={filteredPgLocation} />
            ) : (
              <p>Loading map...</p>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
