import { Box, Backdrop, CircularProgress } from "@mui/material";

export default function CirculerProcess() {
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
