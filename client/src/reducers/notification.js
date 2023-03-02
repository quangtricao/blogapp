import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notifyWith(state, action) {
      return action.payload;
    },
  },
});

let timeRemain = null;

export const setNotification = ({ message, type = "" }) => {

  return async (dispatch) => {
    dispatch(notifyWith({ message, type }));

    // if the previous notification still have remain time before disappear
    // clear that time so the current notification has 5s before disappear
    if (timeRemain) {
      clearTimeout(timeRemain);
    }

    timeRemain = setTimeout(() => {
      dispatch(notifyWith(null));
    }, 3000);
  };
};

const { notifyWith } = notiSlice.actions;
export default notiSlice.reducer;
