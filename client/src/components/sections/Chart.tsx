import React, { useState } from "react";
import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import DashBoardTabs from "../DashboardTabs";
import { countryEmissionData, scatterData } from "../../utils/constants";
import { boxStyles } from "../../utils/commonStyles";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DifferentLength() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ ...boxStyles, bgcolor: "#F9F6EE" }}>
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          CO2 Emission Data
          <Divider />
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "20px", lineHeight: 2 }}>
          Explore the global CO2 emission data visualized in different chart
          formats.
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Line Chart" {...a11yProps(0)} />
              <Tab label="Scatter Chart" {...a11yProps(1)} />
            </Tabs>
          </Box>
          {value === 0 && (
            <DashBoardTabs
              value={value}
              index={0}
              type="line"
              lineData={{
                xAxisData: countryEmissionData.map((data) => data.year),
                seriesData: Object.keys(countryEmissionData[0])
                  .filter((key) => key !== "year")
                  .map((key) => ({
                    label: key,
                    // Filter out undefined values before passing them to the chart
                    data: countryEmissionData
                      .map((data) => data[key])
                      .filter((value) => value !== undefined) as number[],
                  })),
              }}
            />
          )}
          {value === 1 && (
            <DashBoardTabs
              value={value}
              index={1}
              type="scatter"
              scatterData={{
                width: 800,
                height: 400,
                series: [
                  {
                    label: "CO2 Emissions",
                    data: scatterData.map((data, index) => ({
                      x: data.year,
                      y: data.emission,
                      id: `data-${index}`, // Adding unique ID
                    })),
                  },
                ],
              }}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}
