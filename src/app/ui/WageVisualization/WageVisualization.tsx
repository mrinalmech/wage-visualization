"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { ThemeProvider } from "@mui/material/styles";

import { VisualizationType } from "@/interfaces";
import { theme } from "@/styles/materialTheme";

import GraphControls from "../GraphControls";
import Graph from "../Graph";
import StateOccupationToggle from "../StateOccupationToggle";

interface Props {
  states: string[];
  occupations: string[];
}

export default function WageVisualization({ states, occupations }: Props) {
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
        <Card variant="outlined" className="pt-4">
          <h1 className="text-xl text-center">Wage Visualization</h1>
          <StateOccupationToggle
            visualizationType={visualizationType}
            onVisualizationTypeChange={onVisualizationTypeChange}
          />
          <Divider className="mt-4" />
          <div className="flex">
            <GraphControls
              visualizationType={visualizationType}
              states={states}
              occupations={occupations}
            />
            <Graph />
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
