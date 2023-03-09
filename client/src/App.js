import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useMatch } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { loginUserToStore, logoutUserFromStore } from "./reducers/user";
import { setNotification } from "./reducers/notification";
import { initializeBlog } from "./reducers/blogs";
import { initializeUserList } from "./reducers/userList";

import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import User from "./components/User";
import Users from "./components/Users";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

import userService from "./services/user";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.userList);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const userFromStorage = userService.getUserFromLocalStorage();
    if (userFromStorage) {
      dispatch(loginUserToStore(userFromStorage));
      dispatch(initializeBlog());
      dispatch(initializeUserList());
    } else {
      navigate("/sign-in");
    }
  }, [dispatch, navigate]);

  const logout = () => {
    dispatch(logoutUserFromStore());
    userService.clearUserFromLocalStorage();
    navigate("/sign-in");
    dispatch(setNotification({ message: "Log out!" }));
  };

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog ? blogs.find((blog) => blog.id === matchBlog.params.id) : null;

  const matchUser = useMatch("/users/:id");
  const user = matchUser ? users.find((user) => user.id === matchUser.params.id) : null;

  if (loginUser === null) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Box>
        <NavBar user={loginUser.username} logout={logout} />
        <Notification />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={user} />} />
          </Routes>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default App;
