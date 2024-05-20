import { combineReducers, configureStore } from "@reduxjs/toolkit";
import StoreStateManager from "./Store.StateManager";

const rootReducer = combineReducers({
  globalState: StoreStateManager,
});

export const store = configureStore({
  reducer: rootReducer,
});
