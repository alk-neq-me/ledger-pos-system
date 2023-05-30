import { AsyncAction } from "../store";
import { NumbersTable } from "./types";

export const numberTableActions = {
  mergeTable: (table: NumbersTable[]): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@NUMBER_TABLE/FETCH_PENDING" });
    try {
      dispatch({ type: "@@NUMBER_TABLE/FETCH_SUCCESS", payload: table });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@NUMBER_TABLE/FETCH_FAILURE", payload: errMessage });
    };
  }
}
