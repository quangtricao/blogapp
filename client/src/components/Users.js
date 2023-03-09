import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const Users = () => {
  const userList = useSelector((state) => state.userList);

  return (
    <>
      <h2> User List</h2>
      <Table sx={{ minWidth: 650, width: "75%" }}>
        <TableHead style={{ backgroundColor: "#b3d9ff" }}>
          <TableRow>
            <TableCell>
              <strong>Users</strong>
            </TableCell>
            <TableCell>
              <strong>Blogs created</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.username}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name ? user.name : user.username}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Users;
