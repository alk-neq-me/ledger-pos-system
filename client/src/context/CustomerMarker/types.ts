import { Customer } from "../Customer/types";
import { BaseState, ReadAction } from "../types";

export type CustomerMarkerPrefix = "@@CUSTOMER_MARKER"

export type CustomerMarkerState = {
  customerMarker: Customer | undefined
} & BaseState

export type CustomerMarkerAction = ReadAction<CustomerMarkerPrefix>
