import { Divider } from "@mui/material";

import { VisualizationType, WageType, WageTypes } from "@/interfaces";

import WageTypeSelector from "./components/WageTypeSelector";
import GraphFilter from "./components/GraphFilter";

interface Props {
  visualizationType: VisualizationType;
  states: string[];
  occupations: string[];
  wageTypes: WageTypes;
  onWageTypesChange: (name: WageType, checked: boolean) => void;
}

export default function GraphControls({
  visualizationType,
  states,
  occupations,
  wageTypes,
  onWageTypesChange,
}: Props) {
  return (
    <div className="border-r border-slate-200 w-80">
      <WageTypeSelector wageTypes={wageTypes} onChange={onWageTypesChange} />
      <Divider />
      <GraphFilter
        visualizationType={visualizationType}
        states={states}
        occupations={occupations}
      />
    </div>
  );
}
