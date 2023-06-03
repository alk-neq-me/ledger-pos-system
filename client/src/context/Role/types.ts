import { Role } from "../../utils/permission"
import { CRUDActions } from "../types"

export type RoleState = {
  loading: boolean,
  error?: undefined | string,
  rows: Role[]
}

export type RolePrefix = "@@ROLE"

export type RoleAction = CRUDActions<RolePrefix>
