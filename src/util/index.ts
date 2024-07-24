import { WageType } from "@/interfaces";

export const booleanReduce = (obj: { [key: string | WageType]: boolean }) => {
  const array = Object.values(obj);

  const reducedValue = array.reduce((a, c) => a || c, false);

  return reducedValue;
};

const getRandomNumber = (limit: number) => {
  return Math.floor(Math.random() * limit);
};

export const getRandomColor = (): string => {
  const h = getRandomNumber(360);
  const randomColor = `hsl(${h}deg, 50%, 50%)`;
  return randomColor;
};
