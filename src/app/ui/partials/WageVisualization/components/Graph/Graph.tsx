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
  let content = null;

  if (selection === null) {
    content = (
      <p className="text-lg">
        {`Please select ${
          isVisualizationTypeState ? "a state" : "an occupation"
        } from the dropdown on the left`}
      </p>
    );
  } else {
    const subSelectionArray = Object.values(subSelection);

    const subSelectionMade = subSelectionArray.reduce((a, c) => a || c, false);

    if (!subSelectionMade) {
      content = (
        <p className="text-lg">
          {`Please select at least one ${
            isVisualizationTypeState ? "occupation" : "state"
          } from the checkboxes on the left`}
        </p>
      );
    } else {
      content = <div>Graph</div>;
    }
  }

  return (
    <div className="p-4 flex-1 flex flex-col">
      <h2
        className={clsx("text-lg text-center", {
          "opacity-0": selection === null,
        })}
      >
        {selection || "Selection"}
      </h2>
      <div className="flex flex-1 items-center justify-center">{content}</div>
    </div>
  );
}
