import { VisualizationType, WageTypes } from "@/interfaces";

interface Props {
  wageTypes: WageTypes;
  visualizationType: VisualizationType;
  selection: string | null;
}

export default function Graph({
  wageTypes,
  visualizationType,
  selection,
}: Props) {
  return (
    <div className="p-4 flex-1 bg-amber-400">
      <h2 className="text-lg text-center">{selection}</h2>
    </div>
  );
}
