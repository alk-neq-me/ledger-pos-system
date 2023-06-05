import { BaseModel, BaseState, ChangePaginationAction, DeleteAction, Pagination, ReadAction } from "../types"

export type NumbersTablePrefix = "@@NUMBER_TABLE"

export type NumbersTable = {
  number: string,
  total: number,
} & BaseModel

export type NumbersTableState = {
  rows: NumbersTable[],
  pagination: Pagination,
  filter?: Partial<NumbersTable>
} & BaseState

export type NumbersTableAction = 
  | ReadAction<NumbersTablePrefix>
  | DeleteAction<NumbersTablePrefix>
  | ChangePaginationAction<NumbersTablePrefix>
