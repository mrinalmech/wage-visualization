export type VisualizationType = "state" | "occupation";

export interface WageObject {
  a_median: number;
  a_median_RPP: number;
  a_median_CPI: number;
  year: number;
  state: string;
  occ_title: string;
}
