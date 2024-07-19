"use client";

import Card from "@mui/material/Card";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "../../styles/materialTheme";

import StateOccupationToggle from "./stateOccupationToggle";

export default function WageVisualization() {
  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto mt-10 max-w-5xl px-4">
        <Card variant="outlined" className="p-6">
          <h1 className="text-xl text-center">Wage Visualization</h1>
          <StateOccupationToggle />
        </Card>
      </div>
    </ThemeProvider>
  );
}
