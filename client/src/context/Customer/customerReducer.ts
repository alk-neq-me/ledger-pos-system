import { ActionPayload } from "../types";
import { Customer, CustomerAction, CustomerState } from "./types";


const initialState: CustomerState = {
  loading: false,
  error: undefined,
  rows: []
}

export default function customerReducer(
  state: CustomerState = initialState,
  action: ActionPayload<CustomerAction, Customer[] | string | Customer>
) {
  switch (action.type) {
    case "@@CUSTOMER/FETCH_PENDING":
    case "@@CUSTOMER/CREATE_PENDING":
    case "@@CUSTOMER/UPDATE_PENDING":
    case "@@CUSTOMER/DELETE_PENDING":
      return {
        ...state,
        loading: true,
        error: undefined
      };

    case "@@CUSTOMER/FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        rows: "payload" in action
          ? Array.isArray(action.payload)
            ? action.payload
            : state.rows
          : state.rows
      }

    case "@@CUSTOMER/CREATE_SUCCESS":
      return state;

    case "@@CUSTOMER/UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        rows: "payload" in action
          ? typeof action.payload === "object"
            ? state.rows.map(row => row.id === (action.payload as Customer).id ? action.payload : row)
            : state.rows
          : state.rows
      };

    case "@@CUSTOMER/DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        rows: "payload" in action
          ? typeof action.payload === "object"
            ? state.rows.filter(row => row.id !== (action.payload as Customer).id)
            : state.rows
          : state.rows
      };

    case "@@CUSTOMER/FETCH_FAILURE":
    case "@@CUSTOMER/CREATE_FAILURE":
    case "@@CUSTOMER/UPDATE_FAILURE":
    case "@@CUSTOMER/DELETE_FAILURE":
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

