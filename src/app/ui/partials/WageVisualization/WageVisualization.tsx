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

  const isVisualizationTypeState = visualizationType === "state";

  const [wageTypes, setWageTypes] = useState<WageTypes>({
    nominal: true,
    rpp: false,
    cpi: false,
  });

  const handleWageTypesChange = (name: WageType, checked: boolean) => {
    setWageTypes({
      ...wageTypes,
      [name]: checked,
    });
  };

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(
    null
  );

  const selection = isVisualizationTypeState
    ? selectedState
    : selectedOccupation;

  const handleSelectionChange = (selection: string) => {
    if (isVisualizationTypeState) {
      setSelectedState(selection);
    } else {
      setSelectedOccupation(selection);
    }
  };

  const handleVisualizationTypeChange = (
    newVisualizationType: VisualizationType
  ) => {
    setVisualizationType(newVisualizationType);
    setSelectedOccupation(null);
    setSelectedState(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto max-w-10xl px-4">
        <Card variant="outlined" className="pt-4 mt-10">
          <h1 className="text-xl text-center">Wage Trends</h1>
          <StateOccupationToggle
            visualizationType={visualizationType}
            onVisualizationTypeChange={handleVisualizationTypeChange}
          />
          <Divider className="!mt-4" />
          <div className="flex">
            <GraphControls
              isVisualizationTypeState={isVisualizationTypeState}
              states={states}
              occupations={occupations}
              wageTypes={wageTypes}
              selection={selection}
              onWageTypesChange={handleWageTypesChange}
              onSelectionChange={handleSelectionChange}
            />
            <Graph
              visualizationType={visualizationType}
              wageTypes={wageTypes}
              selection={selection}
            />
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
