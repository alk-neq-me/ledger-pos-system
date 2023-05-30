import { User } from "../User/types";
import { ActionPayload } from "../types";
import { AuthAction, AuthState } from "./types";


const initialState: AuthState = {
  loading: false,
  error: undefined,
  auth: undefined
}

export default function(
  state: AuthState = initialState,
  action: ActionPayload<AuthAction, User | string>
): AuthState {
  switch (action.type) {
    case "@@AUTH/LOGIN_PENDING":
    case "@@AUTH/LOGOUT_PENDING":
    case "@@AUTH/REGISTER_PENDING":
      return {
        ...state,
        loading: true,
        error: undefined
      };

    case "@@AUTH/LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        auth: "payload" in action
          ? typeof action.payload === "object"
            ? action.payload
            : undefined
          : undefined
      }

    case "@@AUTH/LOGOUT_SUCCESS":
    case "@@AUTH/REGISTER_SUCCESS":
      return state;

    case "@@AUTH/LOGIN_FAILURE":
    case "@@AUTH/LOGOUT_FAILURE":
    case "@@AUTH/REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        error: "payload" in action
          ? typeof action.payload === "string"
            ? action.payload
            : "unknown error"
          : "unknown error"
      };

    default:
      return state;
  }
}
