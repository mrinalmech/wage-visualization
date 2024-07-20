import { useState } from "react";

import GraphFilterDropdown from "./ui/GraphFilterDropdown";
import GraphFilterCheckboxes from "./ui/GraphFilterCheckboxes";
import GraphFilterSearch from "./ui/GraphFilterSearch";

import { VisualizationType } from "@/interfaces";

interface Props {
  visualizationType: VisualizationType;
  states: string[];
  occupations: string[];
}

export default function GraphFilter({
  visualizationType,
  states,
  occupations,
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
