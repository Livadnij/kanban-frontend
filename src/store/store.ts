import { configureStore } from "@reduxjs/toolkit";

import globalStateReducer from "./stateManager";

const store = configureStore({
  reducer: {
    globalState: globalStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
