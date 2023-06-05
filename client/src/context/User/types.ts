import { SystemRoleEnum } from "../../utils/permission"
import { BaseState, CRUDActions } from "../types"

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
  rows: User[]
} & BaseState


export type UserAction = CRUDActions<UserPrefix>
