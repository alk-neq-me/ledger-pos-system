import { NumbersOrder } from "../context/RecentOrder/types";
import { FormlaFunction } from "./types";

export function createOrderRecent(fn: FormlaFunction, amount: number): NumbersOrder[] {
  const numbers = fn();
  return numbers.map(n => ({ id: crypto.randomUUID(), number: n, amount, createdAt: new Date(), updatedAt: new Date() }));
}
