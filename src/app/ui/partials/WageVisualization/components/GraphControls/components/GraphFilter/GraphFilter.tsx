import { useState } from "react";

import GraphFilterDropdown from "./components/GraphFilterDropdown";
import GraphFilterCheckboxes from "./components/GraphFilterCheckboxes";
import GraphFilterSearch from "./components/GraphFilterSearch";

import { VisualizationType } from "@/interfaces";

interface Props {
  visualizationType: VisualizationType;
  states: string[];
  occupations: string[];
  selection: string | null;
  onSelectionChange: (selection: string) => void;
}

export default function GraphFilter({
  visualizationType,
  states,
  occupations,
  selection,
  onSelectionChange,
}: Props) {
  const [search, setSearch] = useState("");

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  return (
    <>
      <GraphFilterDropdown
        visualizationType={visualizationType}
        states={states}
        occupations={occupations}
        selection={selection}
        onSelectionChange={onSelectionChange}
      />
      <GraphFilterSearch
        visualizationType={visualizationType}
        onSearch={handleSearch}
      />
      <GraphFilterCheckboxes
        visualizationType={visualizationType}
        states={states}
        occupations={occupations}
        search={search}
      />
    </>
  );
}
