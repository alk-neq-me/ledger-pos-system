import { Customer } from "../Customer/types";
import { ActionPayload } from "../types";
import { CustomerMarkerAction, CustomerMarkerState } from "./types";

const inititalState: CustomerMarkerState = {
  loading: false,
  error: undefined,
  customerMarker: undefined
}

export default function(
  state: CustomerMarkerState = inititalState,
  action: ActionPayload<CustomerMarkerAction, Customer | string>
): CustomerMarkerState {
  switch (action.type) {
    case "@@CUSTOMER_MARKER/FETCH_PENDING":
      return {
        ...state,
        loading: true,
        error: undefined
      }

    case "@@CUSTOMER_MARKER/FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        customerMarker: "payload" in action
          ? typeof action.payload === "object"
            ? action.payload
            : state.customerMarker
          : state.customerMarker
      };

    case "@@CUSTOMER_MARKER/FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: "payload" in action
          ? typeof action.payload === "string"
            ? action.payload
            : "unknown error"
          : "unknown error"
      };

    default:
      return state;
  }
}
