import { Divider } from "@mui/material";

import { VisualizationType } from "@/interfaces";

import WageTypeSelector from "./components/WageTypeSelector";
import GraphFilter from "./components/GraphFilter";

interface Props {
  visualizationType: VisualizationType;
  states: string[];
  occupations: string[];
}

export default function GraphControls({
  visualizationType,
  states,
  occupations,
}: Props) {
  return (
    <div className="border-r border-slate-200 w-80">
      <WageTypeSelector />
      <Divider />
      <GraphFilter
        visualizationType={visualizationType}
        states={states}
        occupations={occupations}
      />
    </div>
  );
}
