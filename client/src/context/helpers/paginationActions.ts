import { AuthPrefix } from "../Auth/types"
import { CustomerPrefix } from "../Customer/types"
import { CustomerMarkerPrefix } from "../CustomerMarker/types"
import { NumbersTablePrefix } from "../NumberTable/types"
import { RecentOrderPrefix } from "../RecentOrder/types"
import { RolePrefix } from "../Role/types"
import { UserPrefix } from "../User/types"
import { AsyncAction } from "../store"
import { Pagination } from "../types"

type Prefix = 
  | AuthPrefix
  | CustomerPrefix
  | CustomerMarkerPrefix
  | NumbersTablePrefix
  | RecentOrderPrefix
  | RolePrefix
  | UserPrefix

export const paginationChangePage = (page: number, prefix: Prefix): AsyncAction => async (dispatch, getState) => {
  dispatch({ type: `${prefix}/CHANGE_PAGINATION_PENDING` });
  try {
    const par = getState().numberTable.pagination.limit;
    const payload: Pagination = {
      limit: par,
      offset: page * par
    }
    dispatch({ type: `${prefix}/CHANGE_PAGINATION_SUCCESS`, payload });
  } catch (err) {
    let errMessage = "unknown error";
    if (err instanceof Error) errMessage = err.message;
    dispatch({ type: `${prefix}/CHANGE_PAGINATION_FAILURE`, payload: errMessage });
  }
}
