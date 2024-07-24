import { WageType } from "@/interfaces";

export const booleanReduce = (obj: { [key: string | WageType]: boolean }) => {
  const array = Object.values(obj);

  const reducedValue = array.reduce((a, c) => a || c, false);

  return reducedValue;
};
