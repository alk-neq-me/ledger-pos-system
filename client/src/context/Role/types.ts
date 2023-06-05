import { Role } from "../../utils/permission"
import { BaseState, CRUDActions } from "../types"

export type RoleState = {
  rows: Role[]
} & BaseState

export type RolePrefix = "@@ROLE"

export type RoleAction = CRUDActions<RolePrefix>
