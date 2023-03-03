import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  const blogStyle = {
    padding: 10,
    margin: 10,
    borderStyle: "solid",
    borderWidth: 1,
  };

  return (
    <>
      <h1>Blogs</h1>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <br />

      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Blogs;
