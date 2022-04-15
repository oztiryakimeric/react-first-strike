import React from "react";

import { Box, Grid, Stack, Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

import AppBar from "common/component/layout/AppBar";

function HomePage() {
  const { t } = useTranslation();

  return (
    <Box>
      <AppBar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "90vh" }}
      >
        <Grid item xs={3}>
          <Typography variant="h2" gutterBottom component="div" align="center">
            {t("homePage.appName")}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            component="div"
            sx={{ maxWidth: "750px" }}
            align="center"
          >
            {t("homePage.description")}
          </Typography>
          <Stack direction="row" spacing={5} justifyContent="center">
            <Link
              href="https://github.com/oztiryakimeric/react-first-strike"
              variant="body1"
              target="_blank"
            >
              Github
            </Link>
            <Link
              href="https://react-first-strike.web.app/"
              variant="body1"
              target="_blank"
            >
              Demo
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
