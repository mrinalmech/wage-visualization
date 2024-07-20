import { promises as fs } from "fs";

import { WageObject } from "@/interfaces";

import WageVisualization from "./ui/partials/WageVisualization";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/src/data/wage-data.json",
    "utf8"
  );
  const data = JSON.parse(file);

  const statesData = data.map((o: WageObject) => o.state) as string[];
  const states = [...new Set(statesData)];

  const occupationsData = data.map((o: WageObject) => o.occ_title) as string[];
  const occupations = [...new Set(occupationsData)];

  return (
    <main>
      <WageVisualization states={states} occupations={occupations} />
    </main>
  );
}
