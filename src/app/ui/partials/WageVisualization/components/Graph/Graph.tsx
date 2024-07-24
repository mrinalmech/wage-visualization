import { booleanReduce } from "@/util";
import Chart from "./components/Chart";

import { SubSelection, WageObject, WageTypes } from "@/interfaces";

interface Props {
  wageTypes: WageTypes;
  isVisualizationTypeState: boolean;
  selection: string | null;
  subSelection: SubSelection;
  wageData: WageObject[];
}

export default function Graph({
  wageTypes,
  isVisualizationTypeState,
  selection,
  subSelection,
  wageData,
}: Props) {
  let header = "";

  if (selection === null) {
    header = `Please select ${
      isVisualizationTypeState ? "a state" : "an occupation"
    } from the dropdown on the left`;
  } else {
    const subSelectionMade = booleanReduce(subSelection);

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
      <div className="flex-1 flex items-center justify-center">
        <Chart
          isVisualizationTypeState={isVisualizationTypeState}
          wageTypes={wageTypes}
          selection={selection}
          subSelection={subSelection}
          wageData={wageData}
        />
      </div>
    </div>
  );
}
