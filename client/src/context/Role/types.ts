import { Role } from "../../utils/permission"

export type RoleState = {
  loading: boolean,
  error?: undefined | string,
  rows: Role[]
}

export type RoleAction =
  | "@@ROLE/FETCH_PENDING"
  | "@@ROLE/FETCH_FAILURE"
  | "@@ROLE/FETCH_SUCCESS"

  | "@@ROLE/CREATE_PENDING"
  | "@@ROLE/CREATE_FAILURE"
  | "@@ROLE/CREATE_SUCCESS"

  | "@@ROLE/UPDATE_PENDING"
  | "@@ROLE/UPDATE_FAILURE"
  | "@@ROLE/UPDATE_SUCCESS"

  | "@@ROLE/DELETE_PENDING"
  | "@@ROLE/DELETE_FAILURE"
  | "@@ROLE/DELETE_SUCCESS"
