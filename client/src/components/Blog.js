import { useDispatch, useSelector } from 'react-redux';
import { removeBlog, reactToBlog } from "../reducers/blogs";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

  const updateLike = async (blog) => {
		const reactedBlog = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id,
		};
    dispatch(reactToBlog(reactedBlog));
	};

  const deleteBlog = (blog) => {
		if (window.confirm(`remove '${blog.title}' by ${blog.author}?`)) {
			dispatch(removeBlog(blog.id));
		} else return;
	};

  if (!blog) {
    return null;
  }

  return (
    <>
      <div>
        <h2>{blog.title}</h2>
        <div>URL: <a href={blog.url}>{blog.url}</a></div>
        <div>
          likes: {blog.likes} {" "}
          <button id='like-button' style={{ color: 'red' }} onClick={() => {updateLike(blog)}}> like </button>
        </div>
        <div>Author: {blog.author ? blog.author : 'Anonymous'}</div>

        {/* only renders remove button to the user who created the blog */}
        {blog.user.username === user.username
        ? <button id='remove-button' style={{ color: 'blue' }} onClick={() => {deleteBlog(blog)}}>remove</button>
        : <></> }
      </div>
    </>
  )
}

export default Blog
