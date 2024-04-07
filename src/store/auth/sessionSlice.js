import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "auth/session",
  initialState: {
    access: "",
    signedIn: false
  },
  reducers: {
    onSignInSuccess: (state, action) => {
      state.signedIn = true;
      state.access = action.payload;
    },
    onSignOutSuccess: state => {
      state.signedIn = false;
      state.access = "";
    },
    setaccess: (state, action) => {
      state.access = action.payload;
    }
  }
});

export const { onSignInSuccess, onSignOutSuccess, setaccess } =
  sessionSlice.actions;

export default sessionSlice.reducer;
