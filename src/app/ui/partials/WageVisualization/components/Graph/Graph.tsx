import { WageTypes } from "@/interfaces";

interface Props {
  wageTypes: WageTypes;
}

export default function Graph({ wageTypes }: Props) {
  return (
    <div className="p-4 flex-1 bg-amber-400">
      <p>Nominal: {wageTypes.nominal.toString()}</p>
    </div>
  );
}
