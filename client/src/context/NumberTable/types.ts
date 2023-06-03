import { BaseModel, BaseState, ChangePaginationAction, DeleteAction, ReadAction } from "../types"

export type NumbersTablePrefix = "@@NUMBER_TABLE"

export type NumbersTable = {
  number: string,
  total: number,
} & BaseModel

export type NumbersTableState = {
  rows: NumbersTable[]
} & BaseState<NumbersTable>

export type NumbersTableAction = 
  | ReadAction<NumbersTablePrefix>
  | DeleteAction<NumbersTablePrefix>
  | ChangePaginationAction<NumbersTablePrefix>
