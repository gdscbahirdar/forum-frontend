import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  username: "",
  role: ""
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (_, action) => ({
      username: action.payload.username,
      role: action.payload.role
    }),
    userLoggedOut: () => initialState
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
