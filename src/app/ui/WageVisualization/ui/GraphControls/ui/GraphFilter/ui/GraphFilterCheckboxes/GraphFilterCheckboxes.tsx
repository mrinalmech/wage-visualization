import { useMemo } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { VisualizationType } from "@/interfaces";
import { Divider } from "@mui/material";

interface Props {
  visualizationType: VisualizationType;
  states: string[];
  occupations: string[];
  search: string;
}

export default function GraphFilterCheckboxes({
  visualizationType,
  states,
  occupations,
  search,
}: Props) {
  const stateCheckboxes = useMemo(
    () =>
      states
        .filter((s) => s.includes(search))
        .map((s) => (
          <FormControlLabel key={s} control={<Checkbox />} label={s} />
        )),
    [states, search]
  );
  const occupationCheckboxes = useMemo(
    () =>
      occupations
        .filter((o) => o.includes(search))
        .map((o) => (
          <FormControlLabel key={o} control={<Checkbox />} label={o} />
        )),
    [occupations, search]
  );

  const checkboxes =
    visualizationType === "state" ? stateCheckboxes : occupationCheckboxes;

  return (
    <div className="mt-4">
      <Divider />
      <div className="pl-4 h-96 overflow-y-scroll">
        <FormGroup>{checkboxes}</FormGroup>
      </div>
    </div>
  );
}
