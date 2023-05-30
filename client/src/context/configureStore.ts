import { Store, applyMiddleware, compose, createStore } from "redux";
import { RootState } from "./types";
import { createRootReducer } from "./store";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const history = createBrowserHistory();

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState?: RootState): Store<RootState> {
  return createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      ),
      composeEnchancers()
    )
  )
}
