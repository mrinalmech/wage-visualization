import { createTheme } from "@mui/material/styles";

import { inter } from "@/typography";

export const theme = createTheme({
  typography: {
    fontFamily: `var(${inter.variable})`,
  },
});
