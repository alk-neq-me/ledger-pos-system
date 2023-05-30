import { RouterState } from "connected-react-router"
import { NumberOrderState } from "./RecentOrder/types"
import { UserState } from "./User/types"
import { CustomerState } from "./Customer/types"
import { AuthState } from "./Auth/types"
import { RoleState } from "./Role/types"
import { CustomerMarkerState } from "./CustomerMarker/types"
import { NumbersTableState } from "./NumberTable/types"

export type RootState = {
  router: RouterState,
  recentOrder: NumberOrderState,
  numberTable: NumbersTableState,
  users: UserState,
  customers: CustomerState,
  marker: CustomerMarkerState,
  auth: AuthState,
  roles: RoleState
}

export type ActionPayload<T, P> = 
  | { type: T }
  | { type: T, payload: P }
