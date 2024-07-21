import clsx from "clsx";

import { SubSelection, WageTypes } from "@/interfaces";

interface Props {
  wageTypes: WageTypes;
  isVisualizationTypeState: boolean;
  selection: string | null;
  subSelection: SubSelection;
}

export default function Graph({
  wageTypes,
  isVisualizationTypeState,
  selection,
  subSelection,
}: Props) {
  let header = "";

  if (selection === null) {
    header = `Please select ${
      isVisualizationTypeState ? "a state" : "an occupation"
    } from the dropdown on the left`;
  } else {
    const subSelectionArray = Object.values(subSelection);

    const subSelectionMade = subSelectionArray.reduce((a, c) => a || c, false);

    if (!subSelectionMade) {
      header = `Please select at least one ${
        isVisualizationTypeState ? "occupation" : "state"
      } from the checkboxes on the left`;
    } else {
      header = selection;
    }
  }

  return (
    <div className="p-4 flex-1 flex flex-col">
      <h2 className="text-lg text-center mb-2">{header}</h2>
      <div className="flex-1">Chart</div>
    </div>
  );
}
