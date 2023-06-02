import { AsyncAction } from "../store";
import { customerServices } from "./customerServices";
import { Customer } from "./types";

export const customerActions = {
  fetchCustomers: (): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@CUSTOMER/FETCH_PENDING" });
    try {
      const customers: Customer[] = await customerServices.getCustomers();
      dispatch({ type: "@@CUSTOMER/FETCH_SUCCESS", payload: customers });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@CUSTOMER/FETCH_FAILURE", payload: errMessage });
    }
  },

  updateCustomer: (customer: Customer): AsyncAction => async (dispatch) => {
    console.log(customer)
    dispatch({ type: "@@CUSTOMER/UPDATE_PENDING" });
    try {
      dispatch({ type: "@@CUSTOMER/UPDATE_SUCCESS", payload: customer });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@CUSTOMER/UPDATE_FAILURE", payload: errMessage });
    }
  },

  deleteCustomer: (customer: Customer): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@CUSTOMER/DELETE_PENDING" });
    try {
      dispatch({ type: "@@CUSTOMER/DELETE_SUCCESS", payload: customer });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@CUSTOMER/DELETE_FAILURE", payload: errMessage });
    }
  }
}
