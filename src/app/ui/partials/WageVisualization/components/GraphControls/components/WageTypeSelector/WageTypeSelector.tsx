import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { WageType, WageTypes } from "@/interfaces";

interface Props {
  wageTypes: WageTypes;
  onChange: (name: WageType, checked: boolean) => void;
}

export default function WageTypeSelector({ wageTypes, onChange }: Props) {
  const { nominal, rpp, cpi } = wageTypes;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.name as WageType, event.target.checked);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg text-center">Wage Type</h2>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={nominal}
              onChange={handleChange}
              name="nominal"
            />
          }
          label="Nominal"
        />
        <FormControlLabel
          control={
            <Checkbox checked={rpp} onChange={handleChange} name="rpp" />
          }
          label="RPP-adjusted"
        />
        <FormControlLabel
          control={
            <Checkbox checked={cpi} onChange={handleChange} name="cpi" />
          }
          label="CPI-adjusted"
        />
      </FormGroup>
    </div>
  );
}
