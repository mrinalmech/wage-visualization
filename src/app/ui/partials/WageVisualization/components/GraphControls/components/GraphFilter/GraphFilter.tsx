import { useState } from "react";

import GraphFilterDropdown from "./components/GraphFilterDropdown";
import GraphFilterCheckboxes from "./components/GraphFilterCheckboxes";
import GraphFilterSearch from "./components/GraphFilterSearch";

interface Props {
  isVisualizationTypeState: boolean;
  states: string[];
  occupations: string[];
  selection: string | null;
  onSelectionChange: (selection: string) => void;
}

export default function GraphFilter({
  isVisualizationTypeState,
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
        isVisualizationTypeState={isVisualizationTypeState}
        states={states}
        occupations={occupations}
        selection={selection}
        onSelectionChange={onSelectionChange}
      />
      <GraphFilterSearch
        isVisualizationTypeState={isVisualizationTypeState}
        onSearch={handleSearch}
      />
      <GraphFilterCheckboxes
        isVisualizationTypeState={isVisualizationTypeState}
        states={states}
        occupations={occupations}
        search={search}
      />
    </>
  );
}
