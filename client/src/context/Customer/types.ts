import { NumbersOrder } from "../RecentOrder/types"
import { BaseState, CRUDActions } from "../types"

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
  rows: Customer[]
} & BaseState

export type CustomerAction = CRUDActions<CustomerPrefix>
