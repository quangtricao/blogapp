import { createSlice } from "@reduxjs/toolkit";
import usersListService from "../services/userList";

const usersListSlice = createSlice({
  name: "usersList",
  initialState: [],
  reducers: {
    initialize(state, action) {
      return action.payload;
    },
  },
});

export const initializeUserList = () => {
  return async (dispatch) => {
    const usersList = await usersListService.getAll();
    dispatch(initialize(usersList));
  };
};

const { initialize } = usersListSlice.actions;
export default usersListSlice.reducer;
