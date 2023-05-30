import { User } from "../User/types"

export type AuthState = {
  loading: boolean,
  error?: undefined | string,
  auth?: User | undefined
}

export type AuthAction = 
  | "@@AUTH/LOGIN_PENDING"
  | "@@AUTH/LOGIN_SUCCESS"
  | "@@AUTH/LOGIN_FAILURE"

  | "@@AUTH/REGISTER_PENDING"
  | "@@AUTH/REGISTER_SUCCESS"
  | "@@AUTH/REGISTER_FAILURE"

  | "@@AUTH/LOGOUT_PENDING"
  | "@@AUTH/LOGOUT_SUCCESS"
  | "@@AUTH/LOGOUT_FAILURE"
