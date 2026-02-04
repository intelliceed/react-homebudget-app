import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Preloader = () => {
  return (
    <Box sx={{ mt: "30px" }}>
      <LinearProgress />
    </Box>
  );
};

export default Preloader;
