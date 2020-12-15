import { createStore, compose } from "redux";
import rootReducer from "./reducers";

const initialState = {};

// add the devtools property to the global window
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(rootReducer, initialState, composeEnhancer());
  return store;
}
