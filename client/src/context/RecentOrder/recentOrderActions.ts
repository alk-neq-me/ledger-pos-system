import { AsyncAction } from "../store";
import { NumbersOrder } from "./types";


export const recentOrderActions = {
  fetchRecentOrder: (orders: NumbersOrder[]): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@NUMBER_ORDER/FETCH_PENDING" });
    try {
      dispatch({ type: "@@NUMBER_ORDER/FETCH_SUCCESS", payload: orders });
    } catch (err) {
      if (err instanceof Error) dispatch({ type: "@@NUMBER_ORDER/FETCH_FAILURE", payload: err.message });
      dispatch({ type: "@@NUMBER_ORDER/FETCH_FAILURE", payload: "unknown error" });
    }
  },

  createRecentOrder: (orders: NumbersOrder[]): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@NUMBER_ORDER/CREATE_PENDING" });
    try {
      dispatch({ type: "@@NUMBER_ORDER/CREATE_SUCCESS", payload: orders });
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
