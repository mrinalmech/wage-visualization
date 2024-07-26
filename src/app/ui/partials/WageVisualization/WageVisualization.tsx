"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { ThemeProvider } from "@mui/material/styles";

import {
  SubSelection,
  VisualizationType,
  WageObject,
  WageType,
  WageTypes,
} from "@/interfaces";
import { theme } from "@/styles/materialTheme";

import GraphControls from "./components/GraphControls";
import Graph from "./components/Graph";
import StateOccupationToggle from "./components/StateOccupationToggle";

interface Props {
  states: string[];
  occupations: string[];
  wageData: WageObject[];
}

export default function WageVisualization({
  states,
  occupations,
  wageData,
}: Props) {
  const [visualizationType, setVisualizationType] =
    useState<VisualizationType>("occupation");

  const isVisualizationTypeState = visualizationType === "state";

  const [wageTypes, setWageTypes] = useState<WageTypes>({
    nominal: true,
    rpp: false,
    cpi: false,
  });

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(
    null
  );

  const selection = isVisualizationTypeState
    ? selectedState
    : selectedOccupation;

  const [subSelection, setSubSelection] = useState<SubSelection>({});

  const handleVisualizationTypeChange = (
    newVisualizationType: VisualizationType
  ) => {
    setVisualizationType(newVisualizationType);
    setSelectedOccupation(null);
    setSelectedState(null);
    setSubSelection({});
  };

  const handleWageTypesChange = (name: WageType, checked: boolean) => {
    setWageTypes({
      ...wageTypes,
      [name]: checked,
    });
  };

  const handleSelectionChange = (selection: string) => {
    if (isVisualizationTypeState) {
      setSelectedState(selection);
    } else {
      setSelectedOccupation(selection);
    }
  };

  const handleSubSelectionChange = (key: string, value: boolean) => {
    setSubSelection({
      ...subSelection,
      [key]: value,
    });
  };

  const clearSubSelection = () => {
    setSubSelection({});
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto px-4">
        <Card variant="outlined" className="pt-2 xl:pt-4 mt-4 xl:mt-10">
          <h1 className="text-xl text-center">Wage Trends</h1>
          <StateOccupationToggle
            visualizationType={visualizationType}
            onVisualizationTypeChange={handleVisualizationTypeChange}
          />
          <Divider className="!mt-2 !xl:mt-4" />
          <div className="flex flex-col xl:flex-row">
            <GraphControls
              isVisualizationTypeState={isVisualizationTypeState}
              states={states}
              occupations={occupations}
              wageTypes={wageTypes}
              selection={selection}
              subSelection={subSelection}
              onWageTypesChange={handleWageTypesChange}
              onSelectionChange={handleSelectionChange}
              onSubSelectionChange={handleSubSelectionChange}
              clearSubSelection={clearSubSelection}
            />
            <Graph
              isVisualizationTypeState={isVisualizationTypeState}
              wageTypes={wageTypes}
              selection={selection}
              subSelection={subSelection}
              wageData={wageData}
            />
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
