import { BaseModel, BaseState, CRUDActions, Pagination } from "../types"

export type NumbersOrder = {
  number: string,
  amount: number,
} & BaseModel

export type RecentOrderPrefix = "@@NUMBER_ORDER"

export type NumberOrderState = {
  rows: NumbersOrder[],
  pagination: Pagination,
  filter?: Partial<NumbersOrder>
} & BaseState

export type NumberOrderAction = 
  | CRUDActions<RecentOrderPrefix>
  | "@@NUMBER_ORDER/DELETE_ALL_PENDING"
  | "@@NUMBER_ORDER/DELETE_ALL_FAILURE"
  | "@@NUMBER_ORDER/DELETE_ALL_SUCCESS"
