import { GenerateNumbers } from "./types";

const generateNumbers = (mode: "2" | "3"): string[] => {
  if (mode === "2") return [...Array(100).keys()].map(d => d.toString().length === 1 ? `0${d}` : `${d}` );

  return [...Array(1000).keys()].map(d => {
    const len = d.toString().length;

    if (len === 1) return `00${d}`;
    else if (len === 2) return `0${d}`;
    return `${d}`;
  });
}

export const generateTableNumbers: GenerateNumbers = (mode) => {
  return generateNumbers(mode).map(number => ({
    id: crypto.randomUUID(),
    number,
    total: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
}
