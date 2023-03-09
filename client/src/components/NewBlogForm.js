import { createBlog } from "../reducers/blogs";
import { useDispatch } from "react-redux";
import { useField } from "../hooks/input";
import { TextField, Box, Button } from "@mui/material";

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
    <>
      <h2>Create new</h2>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          width: "40%",
        }}
      >
        <TextField size="small" label="Title" {...title.fields} sx={{ mt: 1 }} />
        <TextField size="small" label="Author" {...author.fields} sx={{ mt: 1 }} />
        <TextField size="small" label="Url" {...url.fields} sx={{ mt: 1 }} />
      </Box>
      <Button onClick={handleSubmit} type="submit" variant="contained" sx={{ my: 3, mr: 1 }}>
        Create
      </Button>
    </>
  );
};

export default NewBlogForm;
