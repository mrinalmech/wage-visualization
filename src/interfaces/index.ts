export type VisualizationType = "state" | "occupation";

export interface WageObject {
  a_median: number;
  a_median_RPP: number;
  a_median_CPI: number;
  year: number;
  state: string;
  occ_title: string;
}

export type WageType = "nominal" | "rpp" | "cpi";

export interface WageTypes {
  nominal: boolean;
  rpp: boolean;
  cpi: boolean;
}

export interface SubSelection {
  [key: string]: any;
}
