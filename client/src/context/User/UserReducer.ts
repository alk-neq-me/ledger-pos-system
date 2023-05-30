import { ActionPayload } from "../types";
import { User, UserAction, UserState } from "./types";


const initialState: UserState = {
  loading: false,
  error: undefined,
  rows: []
}

export default function userReducer(
  state: UserState = initialState,
  action: ActionPayload<UserAction, User[] | string>
) {
  switch (action.type) {
    case "@@USER/FETCH_PENDING":
    case "@@USER/CREATE_PENDING":
    case "@@USER/UPDATE_PENDING":
    case "@@USER/DELETE_PENDING":
      return {
        ...state,
        loading: true,
        error: undefined
      };

    case "@@USER/FETCH_SUCCESS":
    case "@@USER/CREATE_SUCCESS":
    case "@@USER/UPDATE_SUCCESS":
    case "@@USER/DELETE_SUCCESS":
      return state;

    case "@@USER/FETCH_FAILURE":
    case "@@USER/CREATE_FAILURE":
    case "@@USER/UPDATE_FAILURE":
    case "@@USER/DELETE_FAILURE":
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
