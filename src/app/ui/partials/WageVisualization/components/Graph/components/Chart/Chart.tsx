import { ReactNode } from "react";
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
            data[o.year][`${o[secondarySelection]}-nominal`] =
              o.a_median.toFixed(0);
          }

          if (wageTypes.rpp) {
            data[o.year][`${o[secondarySelection]}-rpp`] =
              o.a_median_RPP.toFixed(0);
          }

          if (wageTypes.cpi) {
            data[o.year][`${o[secondarySelection]}-cpi`] =
              o.a_median_CPI.toFixed(0);
          }
        } else {
          data = {
            ...data,
            [o.year]: {},
          };

          if (wageTypes.nominal) {
            data[o.year][`${o[secondarySelection]}-nominal`] =
              o.a_median.toFixed(0);
          }

          if (wageTypes.rpp) {
            data[o.year][`${o[secondarySelection]}-rpp`] =
              o.a_median_RPP.toFixed(0);
          }

          if (wageTypes.cpi) {
            data[o.year][`${o[secondarySelection]}-cpi`] =
              o.a_median_CPI.toFixed(0);
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

  let lines: ReactNode[] = [];

  Object.entries(subSelection).forEach(([key, value]) => {
    if (value) {
      if (wageTypes.nominal) {
        lines.push(
          <Line
            key={`${key}-nominal`}
            type="monotone"
            dataKey={`${key}-nominal`}
            stroke="#8884d8"
          />
        );
      }

      if (wageTypes.rpp) {
        lines.push(
          <Line
            key={`${key}-rpp`}
            type="monotone"
            dataKey={`${key}-rpp`}
            stroke="#8884d8"
            strokeDasharray="5 3"
            dot={{ strokeDasharray: "0" }}
          />
        );
      }

      if (wageTypes.cpi) {
        lines.push(
          <Line
            key={`${key}-cpi`}
            type="monotone"
            dataKey={`${key}-cpi`}
            stroke="#8884d8"
            strokeDasharray="1 2"
            dot={{ strokeDasharray: "0" }}
          />
        );
      }
    }
  });

  return (
    <LineChart
      width={1000}
      height={600}
      data={chartData}
      margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis
        dataKey="year"
        domain={[2017, 2022]}
        ticks={[2018, 2019, 2020, 2021, 2022]}
        type="number"
      />
      <YAxis
        type="number"
        domain={[0, 250000]}
        ticks={[50000, 100000, 150000, 200000, 250000]}
      />
      <Tooltip />
      <Legend
        align="right"
        layout="vertical"
        verticalAlign="middle"
        wrapperStyle={{ paddingLeft: 50 }}
      />
      {lines}
    </LineChart>
  );
}
