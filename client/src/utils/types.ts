import { NumbersTable } from "../context/NumberTable/types";

export type GenerateNumbers = (mode: "2" | "3") => NumbersTable[];

export type FormlaFunction = () => string[];

export type CustomFormulaFunction = (numbers: (string|number)[]) => FormlaFunction
