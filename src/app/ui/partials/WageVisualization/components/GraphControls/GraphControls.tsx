import { Divider } from "@mui/material";

import { VisualizationType, WageType, WageTypes } from "@/interfaces";

import WageTypeSelector from "./components/WageTypeSelector";
import GraphFilter from "./components/GraphFilter";

interface Props {
  visualizationType: VisualizationType;
  states: string[];
  occupations: string[];
  wageTypes: WageTypes;
  selection: string | null;
  onWageTypesChange: (name: WageType, checked: boolean) => void;
  onSelectionChange: (selection: string) => void;
}

export default function GraphControls({
  visualizationType,
  states,
  occupations,
  wageTypes,
  selection,
  onWageTypesChange,
  onSelectionChange,
}: Props) {
  return (
    <div className="border-r border-slate-200 w-80">
      <WageTypeSelector wageTypes={wageTypes} onChange={onWageTypesChange} />
      <Divider />
      <GraphFilter
        visualizationType={visualizationType}
        states={states}
        occupations={occupations}
        selection={selection}
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
}
