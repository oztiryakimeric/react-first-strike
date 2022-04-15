import PropTypes from "prop-types";
import { CircularProgress, Grid } from "@mui/material";

function Loading({ minHeight }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight }}
    >
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

Loading.propTypes = {
  minHeight: PropTypes.string.isRequired,
};

export default Loading;
