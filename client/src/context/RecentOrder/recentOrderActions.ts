import { Customer } from "../Customer/types";
import { AsyncAction } from "../store";
import { NumbersOrder } from "./types";


export const recentOrderActions = {
  createRecentOrder: (orders: NumbersOrder[], marker: Customer): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@NUMBER_ORDER/CREATE_PENDING" });
    dispatch({ type: "@@CUSTOMER/UPDATE_PENDING" });
    try {
      const newMarker = { ...marker }
      newMarker.books.find(book => book.id === marker.currentBook)?.recents.push(...orders);
      dispatch({ type: "@@NUMBER_ORDER/CREATE_SUCCESS", payload: orders });
      // dispatch({ type: "@@CUSTOMER/UPDATE_SUCCESS", payload: marker });
      console.log(newMarker)
    } catch (err) {
      if (err instanceof Error) dispatch({ type: "@@NUMBER_ORDER/CREATE_FAILURE", payload: err.message });
      dispatch({ type: "@@NUMBER_ORDER/CREATE_FAILURE", payload: "unknown error" });
    }
  },

  removeAllRecentOrder: (): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@NUMBER_ORDER/DELETE_ALL_PENDING" });
    try {
      dispatch({ type: "@@NUMBER_ORDER/DELETE_ALL_SUCCESS" })
    } catch (err) {
      if (err instanceof Error) dispatch({ type: "@@NUMBER_ORDER/DELETE_ALL_FAILURE", payload: err.message });
      dispatch({ type: "@@NUMBER_ORDER/DELETE_ALL_FAILURE", payload: "unknown error" });
    }
  },

  removeRecentOrder: (ids: string[]): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@NUMBER_ORDER/DELETE_PENDING" });
    try {
      for (const id of ids) {
        dispatch({ type: "@@NUMBER_ORDER/DELETE_SUCCESS", payload: id });
      }
    } catch (err) {
      if (err instanceof Error) dispatch({ type: "@@NUMBER_ORDER/DELETE_FAILURE", payload: err.message });
      dispatch({ type: "@@NUMBER_ORDER/DELETE_FAILURE", payload: "unknown error" });
    }
  }
}
