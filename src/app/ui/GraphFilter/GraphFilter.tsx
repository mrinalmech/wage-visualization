import { VisualizationType } from "@/interfaces";

interface Props {
  visualizationType: VisualizationType;
}

export default function GraphFilter({ visualizationType }: Props) {
  const title = visualizationType === "state" ? "States" : "Occupations";

  return (
    <div className="p-4">
      <h2 className="text-lg text-center">{title}</h2>
    </div>
  );
}
