import { CustomFormulaFunction, FormlaFunction } from "./types";

export const brosFunc: FormlaFunction = () => {
  return [12, 23, 34, 45, 56, 67, 78, 89].map(String);
}

export const newFunc: FormlaFunction = () => [22, 66, 11].map(String);

export const only3DFunc: FormlaFunction = () => ["121", "456", "001"];

export const customFunc: CustomFormulaFunction = (numbers) => {
  return () => {
    if (typeof numbers[0] === "number") return numbers.map(d => {
      const len = d.toString().length;
      if (len === 1) return `0${d}`
      return `${d}`
    });
    return numbers.map(String);
  }
}
