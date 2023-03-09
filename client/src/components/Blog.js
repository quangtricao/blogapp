import { useDispatch, useSelector } from "react-redux";
import { removeBlog, reactToBlog } from "../reducers/blogs";
import { useField } from "../hooks/input";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material/";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const comment = useField("text");

  const updateLike = async (blog) => {
    const reactedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(reactToBlog(reactedBlog, "like"));
  };

  const deleteBlog = (blog) => {
    if (window.confirm(`remove '${blog.title}' by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id));
    } else return;
    navigate("/");
  };

  const addComment = (blog) => {
    if (window.confirm("post comment?")) {
      const newBlog = {
        ...blog,
        comments: blog.comments.concat(comment.fields.value),
        user: blog.user.id,
      };
      dispatch(reactToBlog(newBlog, "comment"));
      comment.reset();
    } else return;
  };

  const backMainPage = () => {
    navigate("/");
  };

  if (!blog) {
    return null;
  }

  return (
    <>
      <div>
        <Button variant="contained" sx={{ mt: 2 }} onClick={backMainPage}>
          back
        </Button>
        <h2>{blog.title}</h2>

        <div>
          URL: <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes: {blog.likes}{" "}
          <Button
            size="small"
            variant="outlined"
            sx={{ ml: 3 }}
            onClick={() => {
              updateLike(blog);
            }}
          >
            {" "}
            like{" "}
          </Button>
        </div>
        <div>Author: {blog.author ? blog.author : "Anonymous"}</div>

        {/* only renders remove button to the user who created the blog */}
        {blog.user.username === user.username ? (
          <Button
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "red", color: "white" }}
            onClick={() => {
              deleteBlog(blog);
            }}
          >
            DELETE
          </Button>
        ) : (
          <></>
        )}

        <h3>comments</h3>
        <TextField
          label="Add your thought"
          size="small"
          sx={{ mr: 1 }}
          {...comment.fields}
        ></TextField>
        <Button variant="contained" onClick={() => addComment(blog)}>
          add comment
        </Button>
        <br />

        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Blog;
