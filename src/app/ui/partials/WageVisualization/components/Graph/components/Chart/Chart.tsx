import { ReactNode, useEffect, useState } from "react";
import { Line, LineChart, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

import { SubSelection, WageObject, WageTypes } from "@/interfaces";
import { booleanReduce, getRandomColor } from "@/util";
import { useBreakpointRegion } from "@/hooks";

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

  const primarySelection = isVisualizationTypeState ? "state" : "occ_title";
  const secondarySelection = isVisualizationTypeState ? "occ_title" : "state";

  wageData.forEach((o) => {
    if (
      selection === o[primarySelection] &&
      subSelection[o[secondarySelection]]
    ) {
      if (!data[o.year]) {
        data = {
          ...data,
          [o.year]: {},
        };
      }
      if (wageTypes.nominal && o.a_median) {
        data[o.year][`${o[secondarySelection]}-Nominal`] =
          o.a_median.toFixed(0);
      }

      if (wageTypes.rpp && o.a_median_RPP) {
        data[o.year][`${o[secondarySelection]}-RPP`] =
          o.a_median_RPP.toFixed(0);
      }

      if (wageTypes.cpi && o.a_median_CPI) {
        data[o.year][`${o[secondarySelection]}-CPI`] =
          o.a_median_CPI.toFixed(0);
      }
    }
  });

  const chartData = Object.entries(data).map(([key, value]) => ({
    year: key,
    ...value,
  }));
  return chartData;
};

const BlankState = ({ height, width }: { height: number; width: number }) => (
  <div className="grid grid-cols-5 gap-4 w-full">
    <div className="col-span-4">
      <LineChart
        width={width}
        height={height}
        data={[]}
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
          domain={[0, 150000]}
          ticks={[50000, 100000, 150000]}
        />
      </LineChart>
    </div>
  </div>
);

export default function Chart({
  wageTypes,
  isVisualizationTypeState,
  selection,
  subSelection,
  wageData,
}: Props) {
  const subSelectionMade = booleanReduce(subSelection);
  const wageTypesSelected = booleanReduce(wageTypes);

  const renderBlankState =
    selection === null || !subSelectionMade || !wageTypesSelected;

  const [lineColors, setLineColors] = useState({} as { [key: string]: string });

  const breakpointRegion = useBreakpointRegion();

  let chartWidth = 0;
  let chartHeight = 600;

  switch (breakpointRegion) {
    case "2xl":
      chartWidth = 800;
      break;
    case "xl":
    case "lg":
    case "md":
      chartWidth = 700;
      break;
    case "sm":
      chartWidth = 550;
      chartHeight = 450;
      break;
    case "xs":
      chartWidth = 350;
      chartHeight = 400;
      break;
  }

  useEffect(() => {
    const subSelectionKeys = Object.keys(subSelection);
    const lineColorValues = Object.values(lineColors);

    const colorsAlreadyAssigned =
      subSelectionKeys.length === lineColorValues.length;

    if (colorsAlreadyAssigned) {
      return;
    }

    const newLineColors = {} as { [key: string]: string };

    subSelectionKeys.forEach((selection) => {
      if (lineColors[selection]) {
        newLineColors[selection] = lineColors[selection];
      } else {
        let color = getRandomColor();

        while (lineColorValues.includes(color)) {
          color = getRandomColor();
        }

        newLineColors[selection] = color;
      }
    });

    setLineColors(newLineColors);
  }, [subSelection, lineColors]);

  if (renderBlankState) {
    return <BlankState height={chartHeight} width={chartWidth} />;
  }

  const chartData = processWageData(
    wageTypes,
    isVisualizationTypeState,
    selection,
    subSelection,
    wageData
  );

  const lines: ReactNode[] = [];
  const legendItems: ReactNode[] = [];

  if (selection) {
    Object.entries(subSelection).forEach(([key, value]) => {
      const color = lineColors[key];
      if (value && color) {
        const { nominal, rpp, cpi } = wageTypes;

        if (nominal || rpp || cpi) {
          const nominalLegend = nominal && (
            <div className="flex items-center">
              <hr
                style={{ borderColor: color, borderWidth: 1 }}
                className="w-10 mr-1"
              />
              <p style={{ color }} className="text-sm">
                Nominal
              </p>
            </div>
          );

          const rppLegend = rpp && (
            <div className="flex items-center">
              <hr
                style={{ borderColor: color, borderWidth: 1 }}
                className="w-10 mr-1 border-dashed"
              />
              <p style={{ color }} className="text-sm">
                RPP-adjusted
              </p>
            </div>
          );

          const cpiLegend = cpi && (
            <div className="flex items-center">
              <hr
                style={{ borderColor: color, borderWidth: 1 }}
                className="w-10 mr-1 border-dotted"
              />
              <p style={{ color }} className="text-sm">
                CPI-adjusted
              </p>
            </div>
          );

          legendItems.push(
            <div key={key} className="mb-3 last:mb-0 mr-5 lg:mr-0">
              <h3 style={{ color }}>{key}</h3>
              {nominalLegend}
              {rppLegend}
              {cpiLegend}
            </div>
          );
        }

        if (nominal) {
          lines.push(
            <Line
              key={`${key}-Nominal`}
              type="monotone"
              dataKey={`${key}-Nominal`}
              name={key}
              stroke={color}
              isAnimationActive={false}
            />
          );
        }

        if (rpp) {
          lines.push(
            <Line
              key={`${key}-RPP`}
              type="monotone"
              dataKey={`${key}-RPP`}
              name={key}
              stroke={color}
              strokeDasharray="5 3"
              dot={{ strokeDasharray: "0" }}
              isAnimationActive={false}
            />
          );
        }

        if (cpi) {
          lines.push(
            <Line
              key={`${key}-CPI`}
              type="monotone"
              dataKey={`${key}-CPI`}
              name={key}
              stroke={color}
              strokeDasharray="1 2"
              dot={{ strokeDasharray: "0" }}
              isAnimationActive={false}
            />
          );
        }
      }
    });
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const tooltipItems: ReactNode[] = [];

      Object.entries(subSelection).forEach(([key, value]) => {
        if (value) {
          let color = null as string | null;
          let nominalValue = null as ValueType | null;
          let rppValue = null as ValueType | null;
          let cpiValue = null as ValueType | null;

          for (const elem of payload) {
            if (elem.name === key) {
              if (color === null && elem.color) {
                color = elem.color;
              }

              if (elem.dataKey === `${key}-Nominal` && elem.value) {
                nominalValue = elem.value;
              } else if (elem.dataKey === `${key}-RPP` && elem.value) {
                rppValue = elem.value;
              } else if (elem.dataKey === `${key}-CPI` && elem.value) {
                cpiValue = elem.value;
              }

              const { nominal, rpp, cpi } = wageTypes;

              const loopFinished =
                (!nominal || nominalValue !== null) &&
                (!rpp || rppValue !== null) &&
                (!cpi || cpiValue !== null);

              if (loopFinished) {
                break;
              }
            }
          }

          if (color) {
            const nominalElem = nominalValue && (
              <p style={{ color }} className="text-sm">
                {`Nominal: $${nominalValue}`}
              </p>
            );

            const RPPElem = rppValue && (
              <p style={{ color }} className="text-sm">
                {`RPP-adjusted: $${rppValue}`}
              </p>
            );

            const CPIElem = cpiValue && (
              <p style={{ color }} className="text-sm">
                {`CPI-adjusted: $${cpiValue}`}
              </p>
            );

            const elem = (
              <div className="mb-2 last:mb-0" key={key}>
                <p style={{ color }}>{key}</p>
                {nominalElem}
                {RPPElem}
                {CPIElem}
              </div>
            );

            tooltipItems.push(elem);
          }
        }
      });
      return (
        <div className="bg-white p-3 border">
          <p className="text-center">{label}</p>
          {tooltipItems}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="flex-1 flex justify-center sm:justify-start">
        <LineChart
          width={chartWidth}
          height={chartHeight}
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="year"
            domain={[2017, 2022]}
            ticks={[2018, 2019, 2020, 2021, 2022]}
            type="number"
          />
          <YAxis type="number" />
          <Tooltip content={<CustomTooltip />} />
          {lines}
        </LineChart>
      </div>
      <div
        style={{ maxHeight: chartHeight }}
        className="flex lg:block flex-wrap lg:flex-nowrap justify-center lg:justify-start overflow-y-auto  w-full lg:w-48 mt-4 lg:mt-0"
      >
        {legendItems}
      </div>
    </div>
  );
}
