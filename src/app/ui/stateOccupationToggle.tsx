"use client";

import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type VisualizationType = "state" | "occupation";

export default function StateOccupationToggle() {
  const [visualizationType, setVisualizationType] =
    useState<VisualizationType | null>("state");

  const handleVisualizationType = (
    {},
    newVisualizationType: VisualizationType | null
  ) => {
    if (newVisualizationType !== null) {
      setVisualizationType(newVisualizationType);
    }
  };

  return (
    <div className="mx-auto flex justify-center mt-4">
      <ToggleButtonGroup
        value={visualizationType}
        exclusive
        onChange={handleVisualizationType}
        aria-label="visualization type"
      >
        <ToggleButton value="state" aria-label="state">
          State
        </ToggleButton>
        <ToggleButton value="occupation" aria-label="occupation">
          Occupation
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
