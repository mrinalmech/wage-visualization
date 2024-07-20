"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { ThemeProvider } from "@mui/material/styles";

import { VisualizationType } from "@/interfaces";

import StateOccupationToggle from "./stateOccupationToggle";

import { theme } from "../../styles/materialTheme";

export default function WageVisualization() {
  const [visualizationType, setVisualizationType] =
    useState<VisualizationType>("state");

  const onVisualizationTypeChange = (
    newVisualizationType: VisualizationType
  ) => {
    setVisualizationType(newVisualizationType);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto mt-10 max-w-5xl px-4">
        <Card variant="outlined" className="py-6">
          <h1 className="text-xl text-center">Wage Visualization</h1>
          <StateOccupationToggle
            visualizationType={visualizationType}
            onVisualizationTypeChange={onVisualizationTypeChange}
          />
          <Divider className="my-4" />
        </Card>
      </div>
    </ThemeProvider>
  );
}
