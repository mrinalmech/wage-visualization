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
  clearSubSelection: () => void;
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
  clearSubSelection,
}: Props) {
  return (
    <div className="xl:border-r border-slate-200 w-full xl:w-80">
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
        clearSubSelection={clearSubSelection}
      />
    </div>
  );
}
