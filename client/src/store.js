import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notification";
import userReducer from "./reducers/user";
import blogReducer from "./reducers/blogs";
import userList from "./reducers/userList";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogReducer,
    userList: userList,
  },
});

export default store;
