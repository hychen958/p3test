import { Page } from "../components/layout/Page";
import { Typography, Button, Paper, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Page>
      {/* Welcome message */}
      <Typography variant="h4" gutterBottom>
        Welcome to Lexter Lens, we are so glad to have you here.
      </Typography>

      {/* Relevant Insights section */}
      <Box mb={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Relevant Insights</Typography>
          <Button
            component={Link}
            to="/discussion"
            variant="outlined"
            color="primary"
          >
            See All Insights
          </Button>
        </Grid>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          {/* Placeholder content for Relevant Insights */}
          <Typography>Placeholder for Relevant Insights content.</Typography>
        </Paper>
      </Box>

      {/* Trending Insights section */}
      <Box mb={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Trending Insights</Typography>
          <Button
            component={Link}
            to="/discussion"
            variant="outlined"
            color="primary"
          >
            See All Insights
          </Button>
        </Grid>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          {/* Placeholder content for Trending Insights */}
          <Typography>Placeholder for Trending Insights content.</Typography>
        </Paper>
      </Box>
    </Page>
  );
};

export default Home;
