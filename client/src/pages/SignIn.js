import { Button, CssBaseline, TextField, Link, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useField } from "../hooks/input";
import { loginUserToStore } from "../reducers/user";
import { setNotification } from "../reducers/notification";
import loginService from "../services/login";
import userService from "../services/user";

import Notification from "../components/Notification";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useField("text");
  const password = useField("password");

  const handleSubmit = (event) => {
    event.preventDefault();
    loginService
      .login({
        username: username.fields.value,
        password: password.fields.value,
      })
      .then((user) => {
        dispatch(loginUserToStore(user));
        userService.setUserToLocalStorage(user);
        dispatch(
          setNotification({
            message: `${user.username} logged in!`,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        dispatch(
          setNotification({
            message: error.response.data.error,
            type: "error",
          })
        );
      });
  };

  return (
    <>
      <Notification />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              {...username.fields}
            />
            <TextField margin="normal" required fullWidth label="Password" {...password.fields} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Link href="/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
