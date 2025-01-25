import React from "react";
import { Box } from "@mui/material";
import { ScatterChart, LineChart } from "@mui/x-charts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  lineData?: {
    xAxisData: number[];
    seriesData: Array<{
      data: number[];
      label: string;
    }>;
  };
  scatterData?: {
    width: number;
    height: number;
    series: Array<{
      label: string;
      data: Array<{ x: number; y: number; id: string }>;
    }>;
  };
  type: "line" | "scatter";
}

const DashBoardTabs: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  lineData,
  scatterData,
  type,
}) => {
  return (
    <Box my={2} sx={{ display: value === index ? "block" : "none" }}>
      {type === "line" && lineData && (
        <LineChart
          xAxis={[{ data: lineData.xAxisData }]}
          series={lineData.seriesData.map((series) => ({
            data: series.data,
            name: series.label,
          }))}
          height={400}
        />
      )}
      {type === "scatter" && scatterData && (
        <ScatterChart
          width={scatterData.width}
          height={scatterData.height}
          series={scatterData.series.map((serie) => ({
            name: serie.label,
            data: serie.data,
          }))}
        />
      )}
      {children}
    </Box>
  );
};

export default DashBoardTabs;
