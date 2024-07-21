import { SyntheticEvent, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { VisualizationType } from "@/interfaces";

interface Props {
  isVisualizationTypeState: boolean;
  states: string[];
  occupations: string[];
  selection: string | null;
  onSelectionChange: (selection: string) => void;
}

export default function GraphFilterDropdown({
  isVisualizationTypeState,
  states,
  occupations,
  selection,
  onSelectionChange,
}: Props) {
  const label = isVisualizationTypeState ? "State" : "Occupation";

  const stateOptions = useMemo(
    () => states.map((s) => ({ label: s })),
    [states]
  );

  const occupationOptions = useMemo(
    () => occupations.map((o) => ({ label: o })),
    [occupations]
  );

  const options = isVisualizationTypeState ? stateOptions : occupationOptions;

  const handleChange = (e: SyntheticEvent, value: { label: string } | null) => {
    if (value) {
      onSelectionChange(value.label);
    }
  };

  const value = selection !== null ? { label: selection } : null;

  return (
    <div className="px-4 pt-4">
      <Autocomplete
        disablePortal
        id="filter-dropdown"
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
        onChange={handleChange}
        value={value}
        isOptionEqualToValue={(o, v) => o.label === v.label}
      />
    </div>
  );
}
