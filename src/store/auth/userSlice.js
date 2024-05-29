import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  username: "",
  full_name: "",
  is_first_time_login: false,
  authority: [],
  faculty: "",
  avatar: "",
  reputation: "",
  badges: {}
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    userLoggedOut: () => initialState,
    changePassword: state => {
      state.is_first_time_login = false;
    }
  }
});

export const { setUser, changePassword } = userSlice.actions;

export default userSlice.reducer;
