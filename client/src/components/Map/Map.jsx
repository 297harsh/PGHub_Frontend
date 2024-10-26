import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const MyGoogleMap = ({ gMapLocation = null, zoomLevel = 15 }) => {
  const [zoomValue, setZoomValue] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState(null);

  let center;

  if (gMapLocation != null) {
    center = {
      lat: Number(gMapLocation.lat),
      lng: Number(gMapLocation.lng),
    };
  } else {
    center = {
      lat: 22.54109841178252,
      lng: 73.4447193145752,
    };
  }

  // Zoom increment effect
  useEffect(() => {
    let zoomInterval;
    if (zoomValue < zoomLevel) {
      zoomInterval = setInterval(() => {
        setZoomValue((prevZoom) => prevZoom + 1);
      }, 1000);
    }

    return () => clearInterval(zoomInterval);
  }, [zoomValue, zoomLevel]);

  const loadMarker = (map) => {
    // Use a basic marker
    new google.maps.Marker({
      map: map,
      position: center,
      title: "Location Marker",
    });

    // Add a click event listener to get the clicked location
    map.addListener("click", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedLocation({ lat, lng });
    });
  };

  const onMapLoad = (map) => {
    loadMarker(map);
  };

  return (
    <LoadScript googleMapsApiKey={googleMapApiKey} libraries={libraries}>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={zoomValue}
        center={center}
        onLoad={onMapLoad}
      ></GoogleMap>
      {selectedLocation && (
        <div>
          <p>Selected Latitude: {selectedLocation.lat}</p>
          <p>Selected Longitude: {selectedLocation.lng}</p>
        </div>
      )}
    </LoadScript>
  );
};

export default MyGoogleMap;
