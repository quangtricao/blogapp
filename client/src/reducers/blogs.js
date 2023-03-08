import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blog";
import { setNotification } from "./notification";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    initialize(state, action) {
      return action.payload;
    },
    add(state, action) {
      return state.concat(action.payload);
    },
    remove(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    update(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
  },
});

export const initializeBlog = () => {
  return async (dispatch) => {
    try {
      const response = await blogService.getAll();
      dispatch(initialize(response));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog);
      dispatch(add(response));
      dispatch(
        setNotification({
          message: "A new blog added",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: "error"
        })
      );
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(remove(id));
      dispatch(
        setNotification({
          message: "Delete blog",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: "error",
        })
      );
    }
  };
};

export const reactToBlog = (blog, activity) => {
  return async (dispatch) => {
    try {
      const response = await blogService.update(blog.id, blog);
      dispatch(update(response));
      dispatch(
        setNotification({
          message: `You ${activity === "comment" ? "comment" : "like "} the blog`,
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: "error"
        })
      );
    }
  };
};

const { initialize, add, remove, update } = blogSlice.actions;
export default blogSlice.reducer;
