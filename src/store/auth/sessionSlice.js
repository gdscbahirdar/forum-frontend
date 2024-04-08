import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "auth/session",
  initialState: {
    access: "",
    refresh: "",
    signedIn: false
  },
  reducers: {
    onSignInSuccess: (state, action) => {
      state.signedIn = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    onSignOutSuccess: state => {
      state.signedIn = false;
      state.access = "";
      state.refresh = "";
    },
    setAccess: (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    }
  }
});

export const { onSignInSuccess, onSignOutSuccess, setAccess } =
  sessionSlice.actions;

export default sessionSlice.reducer;
