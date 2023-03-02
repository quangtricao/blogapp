/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    loginUserToStore(state, action) {
      return action.payload;
    },
    logoutUserFromStore(state, action) {
      return null;
    },
  },
});

export const { loginUserToStore, logoutUserFromStore } = userSlice.actions;
export default userSlice.reducer;
