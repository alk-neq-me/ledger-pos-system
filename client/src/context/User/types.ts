import { SystemRoleEnum } from "../../utils/permission"
import { CRUDActions } from "../types"

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  comfirmPassword: string,
  role: SystemRoleEnum
}

export type UserPrefix = "@@USER"

export type UserState = {
  loading: boolean,
  error?: string | undefined,
  rows: User[]
}


export type UserAction = CRUDActions<UserPrefix>
