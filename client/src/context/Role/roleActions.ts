import { Role } from "../../utils/permission";
import { AsyncAction } from "../store";
import { roleService } from "./roleServices";

export const roleActions = {
  fetchRoles: (): AsyncAction => async (dispatch) => {
    dispatch({ type: "@@ROLE/FETCH_PENDING" });
    try {
      const roles: Role[] = await roleService.getRoles();
      dispatch({ type: "@@ROLE/FETCH_SUCCESS", payload: roles });
    } catch (err) {
      let errMessage = "unknown error";
      if (err instanceof Error) errMessage = err.message;
      dispatch({ type: "@@ROLE/FETCH_FAILURE", payload: errMessage });
    }
  }
}
