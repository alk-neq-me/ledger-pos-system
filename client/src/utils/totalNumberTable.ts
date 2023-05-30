import { NumbersTable } from "../context/NumberTable/types";

export function totalNumberTable(table: NumbersTable[]): number {
  return table.map(n => n.total).reduce((a, p) => a + p, 0);
}
