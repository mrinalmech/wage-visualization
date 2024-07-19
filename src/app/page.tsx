import { promises as fs } from "fs";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/wage-data.json",
    "utf8"
  );
  const data = JSON.parse(file);

  console.log(data);
  return <main>New</main>;
}
