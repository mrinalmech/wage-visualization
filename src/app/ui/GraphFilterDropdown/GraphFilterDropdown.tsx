import { useMemo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { VisualizationType } from "@/interfaces";

interface Props {
  visualizationType: VisualizationType;
  states: string[];
  occupations: string[];
}

export default function GraphFilterDropdown({
  visualizationType,
  states,
  occupations,
}: Props) {
  const label = visualizationType === "state" ? "Occupation" : "State";

  const stateOptions = useMemo(
    () => states.map((s) => ({ label: s })),
    [states]
  );

  const occupationOptions = useMemo(
    () => occupations.map((o) => ({ label: o })),
    [occupations]
  );

  const options =
    visualizationType === "state" ? occupationOptions : stateOptions;

  return (
    <Autocomplete
      disablePortal
      id="filter-dropdown"
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
