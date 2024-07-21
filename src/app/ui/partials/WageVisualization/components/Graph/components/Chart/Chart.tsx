import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export default function Chart() {
  const data: any[] = [];

  return (
    <LineChart
      width={730}
      height={500}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
