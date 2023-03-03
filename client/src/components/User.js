import { Link } from "react-router-dom";

const User = ({ user }) => {
  if (user === undefined) {
    return null;
  }

  return (
    <>
      <h2>{user.name ? user.name : user.username}</h2>
      <p>added blogs</p>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default User;
