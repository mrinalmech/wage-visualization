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

const BlankState = () => (
  <div className="grid grid-cols-5 gap-4 w-full">
    <div className="col-span-4">
      <LineChart
        width={800}
        height={600}
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

  if (renderBlankState) {
    return <BlankState />;
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
            <div key={key} className="mb-3 last:mb-0">
              <h3 style={{ color }}>{key}</h3>
              {nominalLegend}
              {rppLegend}
              {cpiLegend}
            </div>
          );
        }

        if (wageTypes.nominal) {
          lines.push(
            <Line
              key={`${key}-Nominal`}
              type="monotone"
              dataKey={`${key}-Nominal`}
              name={key}
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
              name={key}
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
              name={key}
              stroke={color}
              strokeDasharray="1 2"
              dot={{ strokeDasharray: "0" }}
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
  }: {
    active: boolean;
    payload: any;
    label: number;
  }) => {
    if (active && payload && payload.length) {
      const tooltipItems: ReactNode[] = [];

      Object.entries(subSelection).forEach(([key, value]) => {
        if (value) {
          let color = null as string | null;
          let nominalValue = null as string | null;
          let rppValue = null as string | null;
          let cpiValue = null as string | null;

          for (const elem of payload) {
            if (elem.name === key) {
              if (color === null) {
                color = elem.color;
              }

              if (elem.dataKey === `${key}-Nominal`) {
                nominalValue = elem.value;
              } else if (elem.dataKey === `${key}-RPP`) {
                rppValue = elem.value;
              } else if (elem.dataKey === `${key}-CPI`) {
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
          <Tooltip content={<CustomTooltip />} />
          {lines}
        </LineChart>
      </div>
      <div>{legendItems}</div>
    </div>
  );
}
