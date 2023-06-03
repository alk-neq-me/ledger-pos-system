import { NumbersOrder } from "../RecentOrder/types"
import { CRUDActions } from "../types"

export type CustomerPrefix = "@@CUSTOMER"

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

export type CustomerAction = CRUDActions<CustomerPrefix>
