import { createBlog } from "../reducers/blogs";
import { useDispatch } from "react-redux";
import { useField } from "../hooks/input";

const NewBlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title.fields.value,
        author: author.fields.value,
        url: url.fields.value,
      })
    );
    title.reset();
    author.reset();
    url.reset();
    toggleVisibility();
  };

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>title</td>
              <td>
                <input {...title.fields} />
              </td>
            </tr>
            <tr>
              <td>author</td>
              <td>
                <input {...author.fields} />
              </td>
            </tr>
            <tr>
              <td>url</td>
              <td>
                <input {...url.fields} />
              </td>
            </tr>
          </tbody>
        </table>
        <button>create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
