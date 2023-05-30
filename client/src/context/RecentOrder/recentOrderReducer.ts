import { NumberOrderState, NumberOrderAction, NumbersOrder } from "./types";
import { ActionPayload } from "../types";

const initialState: NumberOrderState = {
  loading: false,
  error: undefined,
  rows: []
}

export default function recentOrderReducer(
  state: NumberOrderState = initialState,
  action: ActionPayload<NumberOrderAction, string | NumbersOrder[]>
): NumberOrderState {
  switch (action.type) {
    case "@@NUMBER_ORDER/FETCH_PENDING":
    case "@@NUMBER_ORDER/CREATE_PENDING":
    case "@@NUMBER_ORDER/UPDATE_PENDING":
    case "@@NUMBER_ORDER/DELETE_PENDING":
    case "@@NUMBER_ORDER/DELETE_ALL_PENDING":
      return {
        ...state,
        loading: true,
        error: undefined
      }

    case "@@NUMBER_ORDER/FETCH_SUCCESS":
      return {
        ...state,
        rows: "payload" in action
          ? Array.isArray(action.payload)
            ? action.payload
            : state.rows
          : state.rows
      }

    case "@@NUMBER_ORDER/CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
        rows: "payload" in action
          ? Array.isArray(action.payload)
            ? [ ...state.rows, ...action.payload ]
            : state.rows
          : state.rows
      }

    case "@@NUMBER_ORDER/DELETE_ALL_SUCCESS":
      return {
        ...state,
        loading: false,
        rows: []
      };

    case "@@NUMBER_ORDER/DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        rows: "payload" in action
          ? typeof action.payload === "string"
            ? state.rows.filter(row => row.id !== action.payload)
            : state.rows
          : state.rows
      }

    case "@@NUMBER_ORDER/UPDATE_SUCCESS":
      return state;

    case "@@NUMBER_ORDER/FETCH_FAILURE":
    case "@@NUMBER_ORDER/CREATE_FAILURE":
    case "@@NUMBER_ORDER/UPDATE_FAILURE":
    case "@@NUMBER_ORDER/DELETE_FAILURE":
    case "@@NUMBER_ORDER/DELETE_ALL_FAILURE":
      return {
        ...state,
        loading: false,
        error: "payload" in action
          ? typeof action.payload === "string"
            ? action.payload
            : "unknown error"
          : "unknown error"
      }

    default:
      return state;
  }
}
