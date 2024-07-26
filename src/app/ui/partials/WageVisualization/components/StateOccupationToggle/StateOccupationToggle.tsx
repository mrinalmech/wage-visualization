import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { VisualizationType } from "@/interfaces";

interface Props {
  visualizationType: VisualizationType;
  onVisualizationTypeChange: (newVisualizationType: VisualizationType) => void;
}

export default function StateOccupationToggle({
  onVisualizationTypeChange,
  visualizationType,
}: Props) {
  const handleVisualizationType = (
    {},
    newVisualizationType: VisualizationType | null
  ) => {
    if (newVisualizationType !== null) {
      onVisualizationTypeChange(newVisualizationType);
    }
  };

  return (
    <div className="mx-auto flex justify-center mt-2 xl:mt-4">
      <ToggleButtonGroup
        value={visualizationType}
        exclusive
        onChange={handleVisualizationType}
        aria-label="visualization type"
      >
        <ToggleButton
          value="occupation"
          aria-label="occupation"
          classes={{ root: "!normal-case !p-2 w-28 !text-base" }}
        >
          Occupation
        </ToggleButton>
        <ToggleButton
          value="state"
          aria-label="state"
          classes={{ root: "!normal-case !p-2 w-28 !text-base" }}
        >
          State
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
