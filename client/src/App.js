import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useMatch } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

import { loginUserToStore, logoutUserFromStore } from "./reducers/user";
import { setNotification } from "./reducers/notification";
import { initializeBlog } from "./reducers/blogs";
import { initializeUserList } from "./reducers/userList";

import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import User from "./components/User";
import Users from "./components/Users";
import Notification from "./components/Notification";

import userService from "./services/user";

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
			navigate("/login");
		}
	}, [dispatch, navigate]);

	const logout = () => {
		dispatch(logoutUserFromStore());
		userService.clearUserFromLocalStorage();
		navigate("/login");
		dispatch(setNotification({ message: "Log out!" }));
	};

	const matchBlog = useMatch("/blogs/:id");
	const blog = matchBlog
		? blogs.find((blog) => blog.id === matchBlog.params.id)
		: null;

	const matchUser = useMatch("/users/:id");
	const user = matchUser
		? users.find((user) => user.id === matchUser.params.id)
		: null;

	if (loginUser === null) {
		return null;
	}

	return (
		<>
			<div>
				<Link to="/">blogs</Link> {"  "}
				<Link to="/users">users</Link> {"  "}
				{loginUser.username} {"  "} logged in
				<button id="log-out-button" onClick={logout}>
					logout
				</button>
			</div>

			<Notification />

			<Routes>
				<Route path="/" element={<Blogs />} />
				<Route path="/blogs/:id" element={<Blog blog={blog} />} />
				<Route path="/users" element={<Users />} />
				<Route path="/users/:id" element={<User user={user}/>} />
			</Routes>
			<br />

			{/* Footer */}
		</>
	);
};

export default App;
