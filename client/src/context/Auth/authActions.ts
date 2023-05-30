import { AsyncAction } from "../store";
import { authServices } from "./authServices";


export const authActions = {
  loginUser: (): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@AUTH/LOGIN_PENDING" });
    try {
      const user = await authServices.getMe();
      dispatch({ type: "@@AUTH/LOGIN_SUCCESS", payload: user });
    } catch (err) {
      if (err instanceof Error) dispatch({ type: "@@AUTH/LOGIN_FAILURE", payload: err.message });
      dispatch({ type: "@@AUTH/LOGIN_FAILURE", payload: "unknown error" });
    }
  }
}
