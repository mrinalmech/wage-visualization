"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { ThemeProvider } from "@mui/material/styles";

import { VisualizationType, WageType, WageTypes } from "@/interfaces";
import { theme } from "@/styles/materialTheme";

import GraphControls from "./components/GraphControls";
import Graph from "./components/Graph";
import StateOccupationToggle from "./components/StateOccupationToggle";

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

  const [wageTypes, setWageTypes] = useState<WageTypes>({
    nominal: true,
    rpp: false,
    cpi: false,
  });

  const onWageTypesChange = (name: WageType, checked: boolean) => {
    setWageTypes({
      ...wageTypes,
      [name]: checked,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto max-w-10xl px-4">
        <Card variant="outlined" className="pt-4 mt-10">
          <h1 className="text-xl text-center">Wage Visualization</h1>
          <StateOccupationToggle
            visualizationType={visualizationType}
            onVisualizationTypeChange={onVisualizationTypeChange}
          />
          <Divider className="!mt-4" />
          <div className="flex">
            <GraphControls
              visualizationType={visualizationType}
              states={states}
              occupations={occupations}
              wageTypes={wageTypes}
              onWageTypesChange={onWageTypesChange}
            />
            <Graph wageTypes={wageTypes} />
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
