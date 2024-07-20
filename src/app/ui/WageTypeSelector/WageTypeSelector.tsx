import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function WageTypeSelector() {
  return (
    <div className="p-4">
      <h2 className="text-lg text-center">Wage Type</h2>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Nominal"
        />
        <FormControlLabel control={<Checkbox />} label="RPP-adjusted" />
        <FormControlLabel control={<Checkbox />} label="CPI-adjusted" />
      </FormGroup>
    </div>
  );
}
