import { User } from "../User/types"

export type AuthPrefix = "@@AUTH";

export type AuthState = {
  loading: boolean,
  error?: undefined | string,
  auth?: User | undefined
}

export type AuthAction = 
  | `${AuthPrefix}/LOGIN_PENDING`
  | `${AuthPrefix}/LOGIN_SUCCESS`
  | `${AuthPrefix}/LOGIN_FAILURE`

  | `${AuthPrefix}/REGISTER_PENDING`
  | `${AuthPrefix}/REGISTER_SUCCESS`
  | `${AuthPrefix}/REGISTER_FAILURE`

  | `${AuthPrefix}/LOGOUT_PENDING`
  | `${AuthPrefix}/LOGOUT_SUCCESS`
  | `${AuthPrefix}/LOGOUT_FAILURE`
