import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleEnum } from "@/common/types/index";

export interface User {
  id: string;
  username: string;
  email: string;
  role: RoleEnum;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signinSuccess: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    signout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },

    restoreAuth: (state) => {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      if (token && user) {
        state.accessToken = token;
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { signinSuccess, signout, restoreAuth } = authSlice.actions;

export default authSlice.reducer;
