import { Link } from "react-router-dom";
import { Button } from "@mui/material/";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();

  const backMainPage = () => {
    navigate("/users");
  };

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <Button variant="contained" sx={{ mt: 2 }} onClick={backMainPage}>
        back
      </Button>
      <h2>{user.name ? user.name : user.username}</h2>
      <p>added blogs</p>

      {user.blogs.length === 0 ? (
        <p>There is no blogs yet... Let's add blogs</p>
      ) : (
        <ol>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
};

export default User;
