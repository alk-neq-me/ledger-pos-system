import { Role } from "../../utils/permission";
import { ActionPayload } from "../types";
import { RoleAction, RoleState } from "./types";

const initialState: RoleState = {
  loading: false,
  error: undefined,
  rows: []
}

export default function roleReducer(
  state: RoleState = initialState,
  action: ActionPayload<RoleAction, Role[] | string>
): RoleState {
  switch (action.type) {
    case "@@ROLE/FETCH_PENDING":
    case "@@ROLE/CREATE_PENDING":
    case "@@ROLE/UPDATE_PENDING":
    case "@@ROLE/DELETE_PENDING":
      return {
        ...state,
        loading: true,
        error: undefined
      }

    case "@@ROLE/FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        rows: "payload" in action
          ? Array.isArray(action.payload)
            ? action.payload
            : state.rows
          : state.rows
      };

    case "@@ROLE/CREATE_SUCCESS":
    case "@@ROLE/UPDATE_SUCCESS":
    case "@@ROLE/DELETE_SUCCESS":
      return state;

    case "@@ROLE/FETCH_FAILURE":
    case "@@ROLE/CREATE_FAILURE":
    case "@@ROLE/UPDATE_FAILURE":
    case "@@ROLE/DELETE_FAILURE":
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
