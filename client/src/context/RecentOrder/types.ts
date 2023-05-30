export type NumbersOrder = {
  id: string,
  number: string,
  amount: number,
  createdAt: Date,
  updatedAt: Date,
}

export type NumberOrderState = {
  loading: boolean,
  error?: string | undefined,
  rows: NumbersOrder[]
}

export type NumberOrderAction = 
  | "@@NUMBER_ORDER/FETCH_PENDING"
  | "@@NUMBER_ORDER/FETCH_FAILURE"
  | "@@NUMBER_ORDER/FETCH_SUCCESS"

  | "@@NUMBER_ORDER/CREATE_PENDING"
  | "@@NUMBER_ORDER/CREATE_FAILURE"
  | "@@NUMBER_ORDER/CREATE_SUCCESS"

  | "@@NUMBER_ORDER/UPDATE_PENDING"
  | "@@NUMBER_ORDER/UPDATE_FAILURE"
  | "@@NUMBER_ORDER/UPDATE_SUCCESS"

  | "@@NUMBER_ORDER/DELETE_PENDING"
  | "@@NUMBER_ORDER/DELETE_FAILURE"
  | "@@NUMBER_ORDER/DELETE_SUCCESS"

  | "@@NUMBER_ORDER/DELETE_ALL_PENDING"
  | "@@NUMBER_ORDER/DELETE_ALL_FAILURE"
  | "@@NUMBER_ORDER/DELETE_ALL_SUCCESS"
