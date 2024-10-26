import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapComponent = ({ locations }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapApiKey,
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
    // height: "400px",
  };

  const center =
    locations.length > 0
      ? {
          lat: parseFloat(locations[0].lat),
          lng: parseFloat(locations[0].lng),
        }
      : { lat: 0, lng: 0 };

  return (
    isLoaded && (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(location.lat),
              lng: parseFloat(location.lng),
            }}
          />
        ))}
      </GoogleMap>
    )
  );
};

export default MapComponent;
