import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";

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
          label={
            <div className="flex">
              <span className="mr-2">Nominal</span>
              <Tooltip
                title="Actual dollar amounts paid to workers, not adjusted for inflation or cost of living."
                placement="right"
                classes={{
                  tooltip: "text-sm",
                }}
              >
                <InfoIcon />
              </Tooltip>
            </div>
          }
        />
        <FormControlLabel
          control={
            <Checkbox checked={rpp} onChange={handleChange} name="rpp" />
          }
          label={
            <div className="flex">
              <span className="mr-2">RPP-adjusted</span>
              <Tooltip
                title="Wages adjusted using Regional Price Parities, which account for differences in price levels across states."
                placement="right"
                classes={{
                  tooltip: "text-sm",
                }}
              >
                <InfoIcon />
              </Tooltip>
            </div>
          }
        />
        <FormControlLabel
          control={
            <Checkbox checked={cpi} onChange={handleChange} name="cpi" />
          }
          label={
            <div className="flex">
              <span className="mr-2">CPI-adjusted</span>
              <Tooltip
                title="Wages adjusted using the Consumer Price Index, which accounts for changes in the cost of living over time."
                placement="right"
                classes={{
                  tooltip: "text-sm",
                }}
              >
                <InfoIcon />
              </Tooltip>
            </div>
          }
        />
      </FormGroup>
    </div>
  );
}
