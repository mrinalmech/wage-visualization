import { Divider } from "@mui/material";

import { SubSelection, WageType, WageTypes } from "@/interfaces";

import WageTypeSelector from "./components/WageTypeSelector";
import GraphFilter from "./components/GraphFilter";

interface Props {
  isVisualizationTypeState: boolean;
  states: string[];
  occupations: string[];
  wageTypes: WageTypes;
  selection: string | null;
  subSelection: SubSelection;
  onWageTypesChange: (name: WageType, checked: boolean) => void;
  onSelectionChange: (selection: string) => void;
  onSubSelectionChange: (key: string, value: boolean) => void;
}

export default function GraphControls({
  isVisualizationTypeState,
  states,
  occupations,
  wageTypes,
  selection,
  subSelection,
  onWageTypesChange,
  onSelectionChange,
  onSubSelectionChange,
}: Props) {
  return (
    <div className="border-r border-slate-200 w-80">
      <WageTypeSelector wageTypes={wageTypes} onChange={onWageTypesChange} />
      <Divider />
      <GraphFilter
        isVisualizationTypeState={isVisualizationTypeState}
        states={states}
        occupations={occupations}
        selection={selection}
        subSelection={subSelection}
        onSelectionChange={onSelectionChange}
        onSubSelectionChange={onSubSelectionChange}
      />
    </div>
  );
}
