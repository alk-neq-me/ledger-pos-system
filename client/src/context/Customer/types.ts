import { NumbersOrder } from "../RecentOrder/types"

type CustomerBook = {
  id: string,
  label: string,
  recents: NumbersOrder[]
}

export type Customer = {
  id: string,
  name: string,
  slug: string,
  currentBook: undefined | string,
  books: CustomerBook[]
}

export type CustomerState = {
  loading: boolean,
  error?: undefined | string,
  rows: Customer[]
}

export type CustomerAction = 
  | "@@CUSTOMER/FETCH_PENDING"
  | "@@CUSTOMER/FETCH_FAILURE"
  | "@@CUSTOMER/FETCH_SUCCESS"

  | "@@CUSTOMER/CREATE_PENDING"
  | "@@CUSTOMER/CREATE_FAILURE"
  | "@@CUSTOMER/CREATE_SUCCESS"

  | "@@CUSTOMER/UPDATE_PENDING"
  | "@@CUSTOMER/UPDATE_FAILURE"
  | "@@CUSTOMER/UPDATE_SUCCESS"

  | "@@CUSTOMER/DELETE_PENDING"
  | "@@CUSTOMER/DELETE_FAILURE"
  | "@@CUSTOMER/DELETE_SUCCESS"
