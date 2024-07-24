import { promises as fs } from "fs";

import { WageObject } from "@/interfaces";

import WageVisualization from "./ui/partials/WageVisualization";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/src/data/wage-data.json",
    "utf8"
  );
  const wageData: WageObject[] = JSON.parse(file);

  const statesData = wageData.map((o) => o.state) as string[];
  const states = [...new Set(statesData)];

  const occupationsData = wageData.map((o) => o.occ_title) as string[];
  const occupations = [...new Set(occupationsData)];

  return (
    <main>
      <WageVisualization
        states={states}
        occupations={occupations}
        wageData={wageData}
      />
    </main>
  );
}
