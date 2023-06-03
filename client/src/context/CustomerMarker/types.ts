import { Customer } from "../Customer/types";
import { ReadAction } from "../types";

export type CustomerMarkerPrefix = "@@CUSTOMER_MARKER"

export type CustomerMarkerState = {
  loading: boolean,
  error?: undefined | string,
  customerMarker: Customer | undefined
}

export type CustomerMarkerAction = ReadAction<CustomerMarkerPrefix>
