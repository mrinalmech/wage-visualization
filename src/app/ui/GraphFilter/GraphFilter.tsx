import { useState } from "react";

import GraphFilterDropdown from "../GraphFilterDropdown";
import GraphFilterCheckboxes from "../GraphFilterCheckboxes";
import GraphFilterSearch from "../GraphFilterSearch";

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
    <div className="p-4 flex-1 flex flex-col">
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
    </div>
  );
}
