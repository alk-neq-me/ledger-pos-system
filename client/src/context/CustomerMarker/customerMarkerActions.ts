import { Customer } from "../Customer/types";
import { AsyncAction } from "../store";

export const customerMarkerActions = {
  selectCustomerMarker: (marker: Customer, currentBook?: string): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@CUSTOMER_MARKER/FETCH_PENDING" });
    try {
      dispatch({ type: "@@CUSTOMER_MARKER/FETCH_SUCCESS", payload: { ...marker, currentBook } });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@CUSTOMER_MARKER/FETCH_FAILURE", payload: errMessage });
    };
  }
}
