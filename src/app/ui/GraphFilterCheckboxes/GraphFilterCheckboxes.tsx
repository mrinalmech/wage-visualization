import { useMemo } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { VisualizationType } from "@/interfaces";

interface Props {
  visualizationType: VisualizationType;
  states: string[];
  occupations: string[];
}

export default function GraphFilterCheckboxes({
  visualizationType,
  states,
  occupations,
}: Props) {
  const stateCheckboxes = useMemo(
    () =>
      states.map((c) => (
        <FormControlLabel key={c} control={<Checkbox />} label={c} />
      )),
    [states]
  );
  const occupationCheckboxes = useMemo(
    () =>
      occupations.map((c) => (
        <FormControlLabel key={c} control={<Checkbox />} label={c} />
      )),
    [occupations]
  );

  const checkboxes =
    visualizationType === "state" ? stateCheckboxes : occupationCheckboxes;

  return (
    <div className="mt-4">
      <FormGroup>{checkboxes}</FormGroup>
    </div>
  );
}
