import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const userList = useSelector((state) => state.userList);

  return (
    <>
      <h1> User List</h1>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {userList.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name ? user.name : user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
