import { AppBar, Toolbar, Button, Box, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";

const NavBar = ({ user, logout }) => {

  return (
    <>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button size="small" color="inherit" component={Link} to="/" sx={{ mr: 3 }}>
              Blogs
            </Button>
            <Button size="small" color="inherit" component={Link} to="/users">
              USERS
            </Button>
          </Box>
          <Avatar sx={{ mr: 1 }}>{user[0].toUpperCase()}</Avatar>
          <Box sx={{ mr: 5 }}>
            <strong>{user.toUpperCase()}</strong>
          </Box>
          <Button size="small" onClick={logout} sx={{ backgroundColor: "red", color: "white" }}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
