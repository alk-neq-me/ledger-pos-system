import { RouterState } from "connected-react-router"
import { NumberOrderState } from "./RecentOrder/types"
import { UserState } from "./User/types"
import { CustomerState } from "./Customer/types"
import { AuthState } from "./Auth/types"
import { RoleState } from "./Role/types"
import { CustomerMarkerState } from "./CustomerMarker/types"
import { NumbersTableState } from "./NumberTable/types"
import { SettingsState } from "./Settings/types"

export type RootState = {
  router: RouterState,
  recentOrder: NumberOrderState,
  numberTable: NumbersTableState,
  users: UserState,
  customers: CustomerState,
  marker: CustomerMarkerState,
  auth: AuthState,
  roles: RoleState,
  settings: SettingsState,
}

export type Pagination = {
  limit: number,
  offset: number
}

export type BaseModel = {
  id: string,
  createdAt: Date,
  updatedAt: Date,
}

export type ReadAction<P extends string> =
 | `${P}/FETCH_PENDING`
 | `${P}/FETCH_SUCCESS`
 | `${P}/FETCH_FAILURE`

export type CreateAction<P extends string> =
 | `${P}/CREATE_PENDING`
 | `${P}/CREATE_SUCCESS`
 | `${P}/CREATE_FAILURE`

export type UpdateAction<P extends string> =
 | `${P}/UPDATE_PENDING`
 | `${P}/UPDATE_SUCCESS`
 | `${P}/UPDATE_FAILURE`

export type DeleteAction<P extends string> =
 | `${P}/DELETE_PENDING`
 | `${P}/DELETE_SUCCESS`
 | `${P}/DELETE_FAILURE`

export type ChangePaginationAction<P extends string> =
  | `${P}/CHANGE_PAGINATION_PENDING`
  | `${P}/CHANGE_PAGINATION_SUCCESS`
  | `${P}/CHANGE_PAGINATION_FAILURE`

export type CRUDActions<P extends string> =
  | CreateAction<P>
  | ReadAction<P>
  | UpdateAction<P>
  | DeleteAction<P>

export type ExtractAction<P extends string, A extends string> = 
  | `${P}/${A}_PENDING`
  | `${P}/${A}_SUCCESS`
  | `${P}/${A}_FAILURE`

export type BaseState = {
  loading: boolean,
  error?: undefined | string,
}

export type ActionPayload<T, P> = 
  | { type: T }
  | { type: T, payload: P }
