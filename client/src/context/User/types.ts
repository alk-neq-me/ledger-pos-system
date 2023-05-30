import { SystemRoleEnum } from "../../utils/permission"

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  comfirmPassword: string,
  role: SystemRoleEnum
}


export type UserState = {
  loading: boolean,
  error?: string | undefined,
  rows: User[]
}


export type UserAction = 
  | "@@USER/FETCH_PENDING"
  | "@@USER/FETCH_FAILURE"
  | "@@USER/FETCH_SUCCESS"

  | "@@USER/CREATE_PENDING"
  | "@@USER/CREATE_FAILURE"
  | "@@USER/CREATE_SUCCESS"

  | "@@USER/UPDATE_PENDING"
  | "@@USER/UPDATE_FAILURE"
  | "@@USER/UPDATE_SUCCESS"

  | "@@USER/DELETE_PENDING"
  | "@@USER/DELETE_FAILURE"
  | "@@USER/DELETE_SUCCESS"
  
