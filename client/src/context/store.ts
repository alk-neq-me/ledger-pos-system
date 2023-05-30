import { History } from 'history';
import { Action, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from './types';
import { useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import recentOrderReducer from './RecentOrder/recentOrderReducer';
import userReducer from './User/UserReducer';
import customerReducer from './Customer/customerReducer';
import authReducer from './Auth/authReducer';
import roleReducer from './Role/roleReducer';
import customerMarkerReducer from './CustomerMarker/customerMarkerReducer';
import numberTableReducer from './NumberTable/numberTableReducer';

export function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    recentOrder: recentOrderReducer,
    numberTable: numberTableReducer,
    users: userReducer,
    customers: customerReducer,
    marker: customerMarkerReducer,
    auth: authReducer,
    roles: roleReducer,
  });
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTypedDispatch = () => useDispatch<ThunkDispatch<RootState, undefined, Action<string>>>();

export type AsyncAction = ThunkAction<Promise<void>, RootState, undefined, Action<string>>;
