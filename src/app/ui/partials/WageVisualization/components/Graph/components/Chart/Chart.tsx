import { ReactNode } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import { SubSelection, WageObject, WageTypes } from "@/interfaces";
import { booleanReduce, getRandomColor } from "@/util";

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
            data[o.year][`${o[secondarySelection]}-Nominal`] =
              o.a_median.toFixed(0);
          }

          if (wageTypes.rpp) {
            data[o.year][`${o[secondarySelection]}-RPP`] =
              o.a_median_RPP.toFixed(0);
          }

          if (wageTypes.cpi) {
            data[o.year][`${o[secondarySelection]}-CPI`] =
              o.a_median_CPI.toFixed(0);
          }
        } else {
          data = {
            ...data,
            [o.year]: {},
          };

          if (wageTypes.nominal) {
            data[o.year][`${o[secondarySelection]}-Nominal`] =
              o.a_median.toFixed(0);
          }

          if (wageTypes.rpp) {
            data[o.year][`${o[secondarySelection]}-RPP`] =
              o.a_median_RPP.toFixed(0);
          }

          if (wageTypes.cpi) {
            data[o.year][`${o[secondarySelection]}-CPI`] =
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

  const lines: ReactNode[] = [];
  const legendItems: ReactNode[] = [];

  const colors: string[] = [];

  if (selection) {
    Object.entries(subSelection).forEach(([key, value]) => {
      if (value) {
        let color = "";

        while (!colors.includes(color)) {
          color = getRandomColor();
          if (!colors.includes(color)) {
            colors.push(color);
          }
        }

        if (wageTypes.nominal || wageTypes.rpp || wageTypes.cpi) {
          legendItems.push(
            <div key={key} className="mb-1 last:mb-0 flex items-center">
              <div
                className="w-3 h-3 mr-2"
                style={{ backgroundColor: color }}
              />
              <p style={{ color }} className="flex-1">
                {key}
              </p>
            </div>
          );
        }

        if (wageTypes.nominal) {
          lines.push(
            <Line
              key={`${key}-Nominal`}
              type="monotone"
              dataKey={`${key}-Nominal`}
              stroke={color}
            />
          );
        }

        if (wageTypes.rpp) {
          lines.push(
            <Line
              key={`${key}-RPP`}
              type="monotone"
              dataKey={`${key}-RPP`}
              stroke={color}
              strokeDasharray="5 3"
              dot={{ strokeDasharray: "0" }}
            />
          );
        }

        if (wageTypes.cpi) {
          lines.push(
            <Line
              key={`${key}-CPI`}
              type="monotone"
              dataKey={`${key}-CPI`}
              stroke={color}
              strokeDasharray="1 2"
              dot={{ strokeDasharray: "0" }}
            />
          );
        }
      }
    });
  }

  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      <div className="col-span-4">
        <LineChart
          width={800}
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
          <YAxis type="number" />
          <Tooltip />
          {lines}
        </LineChart>
      </div>
      <div className="p-4">{legendItems}</div>
    </div>
  );
}
