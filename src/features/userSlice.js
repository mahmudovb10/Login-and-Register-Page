import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {},
    logout: (state, { payload }) => {},
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
