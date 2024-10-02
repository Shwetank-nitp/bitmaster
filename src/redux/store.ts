import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./user-slice";
import languageSlice from "./language-slice";

export const store = configureStore({
  reducer: {
    userstate: userSliceReducer,
    language: languageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
