import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Slider({ images = [] }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    setImageIndex((prevIndex) => {
      if (direction === "left") {
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const handleImageClick = (index) => {
    setImageIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "250px", sm: "350px" },
        display: "flex",
        gap: 2,
        overflow: "hidden",
      }}
    >
      {imageIndex !== null && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          {/* Left Arrow Button */}
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: 5,
              transform: "translateY(-50%)",
              zIndex: 1,
              display: { xs: "none", sm: "block" },
            }}
            onClick={() => changeSlide("left")}
          >
            <ArrowBackIosIcon sx={{ fontSize: "32px", color: "white" }} />
          </IconButton>

          {/* Image Display */}
          <Box sx={{ flex: 10 }}>
            <img
              src={images[imageIndex]}
              alt="Slider"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>

          {/* Right Arrow Button */}
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 5,
              transform: "translateY(-50%)",
              zIndex: 1,
              display: { xs: "none", sm: "block" },
            }}
            onClick={() => changeSlide("right")}
          >
            <ArrowForwardIosIcon sx={{ fontSize: "32px", color: "white" }} />
          </IconButton>

          {/* Close Button */}
          <IconButton
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "white",
              fontSize: "36px",
              padding: "10px",
              display: { xs: "none", sm: "block" },
            }}
            onClick={() => setImageIndex(null)}
          >
            X
          </IconButton>
        </Box>
      )}

      {/* Thumbnail Display */}
      <Box
        sx={{
          flex: 2,
          display: { xs: "none", sm: "block" },
        }}
      >
        {images.length > 0 && (
          <img
            src={images[0]}
            alt="Thumbnail"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={() => setImageIndex(0)}
          />
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {images.slice(1, 3).map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            key={index}
            style={{
              width: "100%",
              height: "100px",
              objectFit: "cover",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(index + 1)}
          />
        ))}
        {images.length > 3 && (
          <Box
            sx={{
              position: "relative",
              height: "100px",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(3)}
          >
            <img
              src={images[3]}
              alt="More Images"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            {images.length - 4 > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="h6">+{images.length - 4} more</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Slider;
