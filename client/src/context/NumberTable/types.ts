export type NumbersTable = {
  id: string,
  number: string,
  total: number,
  createdAt: Date,
  updatedAt: Date,
}

export type NumbersTableState = {
  loading: boolean,
  error?: undefined | string,
  rows: NumbersTable[]
}

export type NumbersTableAction = 
  | "@@NUMBER_TABLE/FETCH_PENDING"
  | "@@NUMBER_TABLE/FETCH_FAILURE"
  | "@@NUMBER_TABLE/FETCH_SUCCESS"

  | "@@NUMBER_TABLE/DELETE_PENDING"
  | "@@NUMBER_TABLE/DELETE_FAILURE"
  | "@@NUMBER_TABLE/DELETE_SUCCESS"
  
