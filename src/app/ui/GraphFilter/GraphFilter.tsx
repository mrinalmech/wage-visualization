import { VisualizationType } from "@/interfaces";

import GraphFilterDropdown from "../GraphFilterDropdown";

interface Props {
  visualizationType: VisualizationType;
  states: string[];
  occupations: string[];
}

export default function GraphFilter({
  visualizationType,
  states,
  occupations,
}: Props) {
  return (
    <div className="p-4">
      <GraphFilterDropdown
        visualizationType={visualizationType}
        states={states}
        occupations={occupations}
      />
    </div>
  );
}
