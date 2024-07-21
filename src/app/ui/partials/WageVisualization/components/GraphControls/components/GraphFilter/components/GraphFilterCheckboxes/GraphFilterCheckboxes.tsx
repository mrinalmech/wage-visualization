import { ChangeEvent, useCallback, useMemo } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";

import { SubSelection } from "@/interfaces";

interface Props {
  isVisualizationTypeState: boolean;
  states: string[];
  occupations: string[];
  search: string;
  subSelection: SubSelection;
  onSubSelectionChange: (key: string, value: boolean) => void;
}

export default function GraphFilterCheckboxes({
  isVisualizationTypeState,
  states,
  occupations,
  search,
  subSelection,
  onSubSelectionChange,
}: Props) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      onSubSelectionChange(name, checked);
    },
    [onSubSelectionChange]
  );

  const stateCheckboxes = useMemo(
    () =>
      states
        .filter((s) => s.includes(search))
        .map((s) => (
          <FormControlLabel
            key={s}
            control={
              <Checkbox
                name={s}
                onChange={handleChange}
                checked={subSelection[s]}
              />
            }
            label={s}
            classes={{ root: "mb-1 last:mb-0" }}
          />
        )),
    [states, search, subSelection, handleChange]
  );
  const occupationCheckboxes = useMemo(
    () =>
      occupations
        .filter((o) => o.includes(search))
        .map((o) => (
          <FormControlLabel
            key={o}
            control={
              <Checkbox
                name={o}
                onChange={handleChange}
                checked={subSelection[o]}
              />
            }
            label={o}
            classes={{ root: "mb-1 last:mb-0" }}
          />
        )),
    [occupations, search, subSelection, handleChange]
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
