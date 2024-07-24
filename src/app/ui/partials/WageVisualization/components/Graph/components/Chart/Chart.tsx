import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import { SubSelection, WageObject, WageTypes } from "@/interfaces";
import { booleanReduce } from "@/util";

interface Props {
  wageTypes: WageTypes;
  isVisualizationTypeState: boolean;
  selection: string | null;
  subSelection: SubSelection;
  wageData: WageObject[];
}

interface ChartData {
  year: number;
  [key: string]: number;
}

const processWageData = (
  wageTypes: WageTypes,
  isVisualizationTypeState: boolean,
  selection: string | null,
  subSelection: SubSelection,
  wageData: WageObject[]
): ChartData[] => {
  let data: { [year: number]: any } = {};

  if (selection === null) return [];

  const subSelectionMade = booleanReduce(subSelection);

  if (!subSelectionMade) return [];

  const wageTypesSelected = booleanReduce(wageTypes);

  if (!wageTypesSelected) return [];

  const primarySelection = isVisualizationTypeState ? "state" : "occ_title";
  const secondarySelection = isVisualizationTypeState ? "occ_title" : "state";

  wageData.forEach((o) => {
    if (selection === o[primarySelection]) {
      if (subSelection[o[secondarySelection]]) {
        if (data[o.year]) {
          if (wageTypes.nominal) {
            data[o.year][`${o[secondarySelection]}-nominal`] = o.a_median;
          }

          if (wageTypes.rpp) {
            data[o.year][`${o[secondarySelection]}-rpp`] = o.a_median_RPP;
          }

          if (wageTypes.cpi) {
            data[o.year][`${o[secondarySelection]}-cpi`] = o.a_median_CPI;
          }
        } else {
          data = {
            ...data,
            [o.year]: {},
          };

          if (wageTypes.nominal) {
            data[o.year][`${o[secondarySelection]}-nominal`] = o.a_median;
          }

          if (wageTypes.rpp) {
            data[o.year][`${o[secondarySelection]}-rpp`] = o.a_median_RPP;
          }

          if (wageTypes.cpi) {
            data[o.year][`${o[secondarySelection]}-cpi`] = o.a_median_CPI;
          }
        }
      }
    }
  });

  const chartData = Object.entries(data).map(([key, value]) => ({
    year: key,
    ...value,
  }));
  return chartData;
};

export default function Chart({
  wageTypes,
  isVisualizationTypeState,
  selection,
  subSelection,
  wageData,
}: Props) {
  const chartData = processWageData(
    wageTypes,
    isVisualizationTypeState,
    selection,
    subSelection,
    wageData
  );

  return (
    <LineChart
      width={730}
      height={500}
      data={chartData}
      margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis
        dataKey="year"
        domain={[2017, 2022]}
        ticks={[2017, 2018, 2019, 2020, 2021, 2022]}
        type="number"
      />
      <YAxis type="number" domain={[0, 200000]} />
      <Tooltip />
      <Legend />
    </LineChart>
  );
}
