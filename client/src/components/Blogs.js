import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";

import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredBlog =
    filter.length === 0
      ? blogs
      : blogs.filter((p) => p.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm toggleVisibility={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>

      <TextField
        size="small"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        label="Filter by name"
        sx={{ my: 2 }}
      />

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead style={{ backgroundColor: "#b3d9ff" }}>
            <TableRow>
              <TableCell>Blog</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Like</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBlog
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((blog) => (
                <TableRow hover key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell align="right">{blog.author}</TableCell>
                  <TableCell align="right">{blog.likes}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={blogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Blogs;
