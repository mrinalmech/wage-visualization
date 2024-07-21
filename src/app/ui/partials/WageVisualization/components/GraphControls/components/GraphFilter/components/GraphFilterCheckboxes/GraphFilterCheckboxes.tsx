import { useMemo } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { Divider } from "@mui/material";

interface Props {
  isVisualizationTypeState: boolean;
  states: string[];
  occupations: string[];
  search: string;
}

export default function GraphFilterCheckboxes({
  isVisualizationTypeState,
  states,
  occupations,
  search,
}: Props) {
  const stateCheckboxes = useMemo(
    () =>
      states
        .filter((s) => s.includes(search))
        .map((s) => (
          <FormControlLabel
            key={s}
            control={<Checkbox />}
            label={s}
            classes={{ root: "mb-1 last:mb-0" }}
          />
        )),
    [states, search]
  );
  const occupationCheckboxes = useMemo(
    () =>
      occupations
        .filter((o) => o.includes(search))
        .map((o) => (
          <FormControlLabel
            key={o}
            control={<Checkbox />}
            label={o}
            classes={{ root: "mb-1 last:mb-0" }}
          />
        )),
    [occupations, search]
  );

  const checkboxes = isVisualizationTypeState
    ? occupationCheckboxes
    : stateCheckboxes;

  return (
    <div className="mt-4">
      <Divider />
      <div className="pl-4 h-96 overflow-y-scroll">
        <FormGroup>{checkboxes}</FormGroup>
      </div>
    </div>
  );
}
