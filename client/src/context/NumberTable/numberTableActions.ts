import { generateTableNumbers } from "../../utils";
import { AsyncAction } from "../store";
import { NumbersTable } from "./types";

export const numberTableActions = {
  mergeTable: (table: NumbersTable[]): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@NUMBER_TABLE/FETCH_PENDING" });
    try {
      const payload = table;
      dispatch({ type: "@@NUMBER_TABLE/FETCH_SUCCESS", payload });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@NUMBER_TABLE/FETCH_FAILURE", payload: errMessage });
    };
  },

  fetchTable: (ledger_mode: "2" | "3"): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@NUMBER_TABLE/FETCH_PENDING" });
    try {
      const table = generateTableNumbers(ledger_mode);
      dispatch({ type: "@@NUMBER_TABLE/FETCH_SUCCESS", payload: table });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@NUMBER_TABLE/FETCH_FAILURE", payload: errMessage });
    };
  }
}
