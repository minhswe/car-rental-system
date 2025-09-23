import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import carReducer from "./carSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
