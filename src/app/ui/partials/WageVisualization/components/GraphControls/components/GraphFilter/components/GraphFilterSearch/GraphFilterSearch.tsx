import { ChangeEvent } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  isVisualizationTypeState: boolean;
  onSearch: (newSearch: string) => void;
}

export default function GraphFilterSearch({
  isVisualizationTypeState,
  onSearch,
}: Props) {
  const label = `Filter by ${
    isVisualizationTypeState ? "occupation" : "state"
  }`;

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mt-4 px-4 h-10">
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="results-filter-input"
          label={label}
          variant="standard"
          onChange={handleSearch}
        />
      </Box>
    </div>
  );
}
