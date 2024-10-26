import { Grid, Box, Typography, Button, Chip } from "@mui/material";
import { KingBed } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const PGCard = styled(Box)(({ theme }) => ({
  width: 300,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[4],
  },
}));

const PGList = ({ pgList, onView, onUpdate, onDelete, onImageClick }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {pgList.map((pg) => (
        <PGCard key={pg._id}>
          <img
            src={pg.images[0]}
            alt={pg.pgName}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => onImageClick(pg)}
          />
          <Box p={2}>
            <Typography variant="h6" component="h2" gutterBottom>
              {pg.pgName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {pg.pgAddress}, {pg.city}
            </Typography>

            <Grid container spacing={1} mt={1}>
              {Object.keys(pg.roomInfo).map((type) => (
                <Grid item key={type}>
                  <Chip
                    icon={<KingBed />}
                    label={type}
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                  />
                </Grid>
              ))}
            </Grid>

            <Box mt={2}>
              <Chip
                label={pg.isFull ? "Not Available" : "Available"}
                color={pg.isFull ? "error" : "success"}
                size="small"
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                size="small"
                onClick={() => onView(pg._id)}
              >
                View
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => onUpdate(pg._id)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => onDelete(pg._id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </PGCard>
      ))}
    </Box>
  );
};

export default PGList;
