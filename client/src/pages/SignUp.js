import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setNotification } from "../reducers/notification";
import { useField } from "../hooks/input";

import Notification from "../components/Notification";

import registerService from "../services/register";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nickname = useField("text");
  const username = useField("text");
  const password = useField("password");

  const handleSubmit = (event) => {
    event.preventDefault();
    registerService
      .register({
        username: username.fields.value,
        nickname: nickname.fields.value,
        password: password.fields.value,
      })
      .then(() => {
        dispatch(
          setNotification({
            message: "register successfully",
          })
        );
        navigate("sign-in");
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth autoFocus label="Username" {...username.fields} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  {...password.fields}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Nickname" {...nickname.fields} />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
