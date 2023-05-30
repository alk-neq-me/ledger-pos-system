import { generateNumbers } from "../../utils/generateNumers";
import { ActionPayload } from "../types";
import { NumbersTable, NumbersTableAction, NumbersTableState } from "./types";

const LEDGER_MODE: "2" | "3" = "2";

const initialState: NumbersTableState = {
  loading: false,
  error: undefined,
  rows: generateNumbers(LEDGER_MODE)
}

export default function(
  state: NumbersTableState = initialState,
  action: ActionPayload<NumbersTableAction, NumbersTable[] | string>
): NumbersTableState {
  switch (action.type) {
    case "@@NUMBER_TABLE/FETCH_PENDING":
    case "@@NUMBER_TABLE/DELETE_PENDING":
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
      return state;

    case "@@NUMBER_TABLE/FETCH_FAILURE":
    case "@@NUMBER_TABLE/DELETE_FAILURE":
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
