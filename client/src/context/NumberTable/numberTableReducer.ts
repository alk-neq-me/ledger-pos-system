import { ActionPayload, Pagination } from "../types";
import { NumbersTable, NumbersTableAction, NumbersTableState } from "./types";

const initialState: NumbersTableState = {
  loading: false,
  error: undefined,
  filter: undefined,
  pagination: {
    limit: 10,
    offset: 1
  },
  rows: [],
}

export default function(
  state: NumbersTableState = initialState,
  action: ActionPayload<NumbersTableAction, NumbersTable[] | string | Pagination>
): NumbersTableState {
  switch (action.type) {
    case "@@NUMBER_TABLE/FETCH_PENDING":
    case "@@NUMBER_TABLE/DELETE_PENDING":
    case "@@NUMBER_TABLE/CHANGE_PAGINATION_PENDING":
      return {
        ...state,
        loading: true,
        error: undefined
      }

    case "@@NUMBER_TABLE/FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        rows: "payload" in action
          ? Array.isArray(action.payload)
            ? action.payload
            : state.rows
          : state.rows
      }

    case "@@NUMBER_TABLE/DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        rows: []
      };

    case "@@NUMBER_TABLE/FETCH_FAILURE":
    case "@@NUMBER_TABLE/DELETE_FAILURE":
    case "@@NUMBER_TABLE/CHANGE_PAGINATION_FAILURE":
      return {
        ...state,
        loading: false,
        error: "payload" in action
          ? typeof action.payload === "string"
            ? action.payload
            : "unknown error"
          : "unknown error"
      }

    case "@@NUMBER_TABLE/CHANGE_PAGINATION_SUCCESS":
      return {
        ...state,
        loading: false,
        pagination: "payload" in action
          ? typeof action.payload === "object" && !Array.isArray(action.payload)
            ? { ...state.pagination, ...action.payload }
            : state.pagination
          : state.pagination
      }

    default:
      // const _unreachable: never = action.type;
      return state;
  }
}
