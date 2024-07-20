import { promises as fs } from "fs";

import WageVisualization from "./ui/WageVisualization";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/src/data/wage-data.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <main>
      <WageVisualization />
    </main>
  );
}
