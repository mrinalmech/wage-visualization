import { Divider } from "@mui/material";

import { VisualizationType } from "@/interfaces";

import WageTypeSelector from "../WageTypeSelector";
import GraphFilter from "../GraphFilter";

interface Props {
  visualizationType: VisualizationType;
}

export default function GraphControls({ visualizationType }: Props) {
  return (
    <div className="border-r border-slate-200">
      <WageTypeSelector />
      <Divider />
      <GraphFilter visualizationType={visualizationType} />
    </div>
  );
}
