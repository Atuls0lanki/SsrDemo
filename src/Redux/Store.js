import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./RootReducer";
import rootSagas from "./RootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [logger, sagaMiddleware];

export const LocalStoreName = "persistState";

// function saveToLocalStorage(state) {
//   try {
//     const serialState = JSON.stringify(state);
//     localStorage.setItem(LocalStoreName, serialState);
//   } catch (e) {
//     console.warn(e);
//   }
// }

// function loadFromLocalStorage() {
//   try {
//     const serialState = localStorage.getItem(LocalStoreName);
//     if (serialState === null) return undefined;
//     return JSON.parse(serialState);
//   } catch (e) {
//     console.warn(e);
//     return undefined;
//   }
// }

const store = createStore(
  rootReducer,
  // loadFromLocalStorage(),
  applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSagas);
store.subscribe(() => {
  // saveToLocalStorage(store.getState()
});

export default store;
