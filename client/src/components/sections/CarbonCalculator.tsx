import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Divider,
  Grid,
} from "@mui/material";
import Co2Icon from "@mui/icons-material/Co2";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

// Steps titles

const CarbonCalculator: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.login);
  return (
    <Box
      position="relative"
      width="100%"
      minHeight="100vh"
      // py={4}
      overflow={"hidden"}
      alignContent={"center"}
    >
      <Container maxWidth={"md"}>
        <Typography variant="h2" gutterBottom>
          Carbon Footprint Calculator
          <Divider />
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 20, my: 4 }}>
          The Carbon Footprint Calculator is an interactive tool designed to
          help you understand and manage your personal impact on the
          environment. By quantifying the carbon emissions from your daily
          activities, this calculator provides a tangible measure of your
          environmental footprint. Our goal is to empower you with knowledge and
          insights to make more sustainable choices in your everyday life.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h3"
              sx={{
                color: "rgb(153, 204, 204)",
                textAlign: "center", // Ensure text is centered within the column
                fontWeight: "bold",
              }}
            >
              Why It Matters?
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: 18, textAlign: "justify" }}
            >
              Understanding your carbon footprint is the first step towards
              making a measurable impact in reducing global greenhouse gas
              emissions. By making informed decisions about transportation,
              food, energy usage, and waste management, you can contribute
              significantly to a healthier planet.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: 18, textAlign: "justify" }}
            >
              The carbon calculator functions through four primary sections,
              each addressing various aspects of your lifestyle's environmental
              impact. It analyzes transportation choices, food consumption
              habits, home energy usage, and waste management practices to
              provide insights into your carbon footprint. By assessing these
              factors, individuals can better understand and potentially reduce
              their contribution to climate change.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h3"
              sx={{
                color: "rgb(153, 204, 204)",
                textAlign: "center", // Ensure text is centered within the column
                fontWeight: "bold",
              }}
            >
              How It Works?
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{
            color: "black",
            mt: 4,
            fontSize: 18,
            borderColor: "black",
            letterSpacing: 4,
            "&:hover": {
              borderColor: "#99cccc",
              color: "#99cccc",
            },
          }}
          fullWidth
          onClick={() =>
            token ? navigate("/emission-calculator") : navigate("/login")
          }
        >
          Start Calculating&nbsp;
          <Co2Icon
            sx={{ color: "#99cccc", fontSize: "3rem", fontWeight: "bold" }}
          />
          &nbsp;Emissions Now
        </Button>
        {/* <Outlet /> */}
      </Container>
    </Box>
  );
};

export default CarbonCalculator;
