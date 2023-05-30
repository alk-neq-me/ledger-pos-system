import { Customer } from "../Customer/types";


export type CustomerMarkerState = {
  loading: boolean,
  error?: undefined | string,
  customerMarker: Customer | undefined
}

export type CustomerMarkerAction = 
  | "@@CUSTOMER_MARKER/FETCH_PENDING"
  | "@@CUSTOMER_MARKER/FETCH_FAILURE"
  | "@@CUSTOMER_MARKER/FETCH_SUCCESS"
