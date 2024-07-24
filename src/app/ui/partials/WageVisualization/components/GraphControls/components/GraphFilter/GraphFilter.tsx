import { useState } from "react";

import GraphFilterDropdown from "./components/GraphFilterDropdown";
import GraphFilterCheckboxes from "./components/GraphFilterCheckboxes";
import GraphFilterSearch from "./components/GraphFilterSearch";

import { SubSelection } from "@/interfaces";

interface Props {
  isVisualizationTypeState: boolean;
  states: string[];
  occupations: string[];
  selection: string | null;
  subSelection: SubSelection;
  onSelectionChange: (selection: string) => void;
  onSubSelectionChange: (key: string, value: boolean) => void;
  clearSubSelection: () => void;
}

export default function GraphFilter({
  isVisualizationTypeState,
  states,
  occupations,
  selection,
  subSelection,
  onSelectionChange,
  onSubSelectionChange,
  clearSubSelection,
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
        subSelection={subSelection}
        onSubSelectionChange={onSubSelectionChange}
        clearSubSelection={clearSubSelection}
      />
    </>
  );
}
