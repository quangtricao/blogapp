import { useState } from "react";
import { createBlog } from "../reducers/blogs";
import { useDispatch } from "react-redux";

const NewBlogForm = () => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(createBlog({ title, author, url }));
		setAuthor("");
		setTitle("");
		setUrl("");
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
								<input value={title} onChange={({ target }) => setTitle(target.value)}/>
							</td>
						</tr>
						<tr>
							<td>author</td>
							<td>
								<input value={author} onChange={({ target }) => setAuthor(target.value)}/>
							</td>
						</tr>
						<tr>
							<td>url</td>
							<td>
								<input value={url} onChange={({ target }) => setUrl(target.value)}/>
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
