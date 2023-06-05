import { User } from "../User/types"
import { ExtractAction } from "../types";

export type AuthPrefix = "@@AUTH";

export type AuthState = {
  loading: boolean,
  error?: undefined | string,
  auth?: User | undefined
}

export type AuthAction = 
  | ExtractAction<AuthPrefix, "LOGIN">
  | ExtractAction<AuthPrefix, "REGISTER">
  | ExtractAction<AuthPrefix, "LOGOUT">
