import { useDispatch, useSelector } from "react-redux";
import { removeBlog, reactToBlog } from "../reducers/blogs";
import { useField } from "../hooks/input";
import { useNavigate } from "react-router-dom";

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

  const addComment = (event, blog) => {
    event.preventDefault();
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
        <button onClick={backMainPage}>back</button>
        <h2>{blog.title}</h2>
        <div>
					URL: <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
					likes: {blog.likes}{" "}
          <button
            id="like-button"
            style={{ color: "red" }}
            onClick={() => {
              updateLike(blog);
            }}
          >
            {" "}
						like{" "}
          </button>
        </div>
        <div>Author: {blog.author ? blog.author : "Anonymous"}</div>

        {/* only renders remove button to the user who created the blog */}
        {blog.user.username === user.username ? (
          <button
            id="remove-button"
            style={{ color: "blue" }}
            onClick={() => {
              deleteBlog(blog);
            }}
          >
						remove
          </button>
        ) : (
          <></>
        )}

        <h3>comments</h3>

        <form onSubmit={(event) => addComment(event, blog)}>
          <input {...comment.fields} />{" "}
          <button> add comment</button>
        </form>
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
