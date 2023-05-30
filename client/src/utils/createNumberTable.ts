import { NumbersTable } from "../context/NumberTable/types";
import { NumbersOrder } from "../context/RecentOrder/types";
import { GenerateNumbers } from "./types";

export function createNumbeTable(mode: "2" | "3") {
  return (fn: GenerateNumbers| NumbersTable[], orderAdd: NumbersOrder[]): NumbersTable[] => {
    const nums_from_table = typeof fn === "function" ? fn(mode) : fn;

    nums_from_table.map(table => {
      orderAdd.map(order => {
        if (order.number === table.number) {
          table.total += order.amount;
          table.updatedAt = order.createdAt;
        }
      })
    });

    return nums_from_table;
  }
}
