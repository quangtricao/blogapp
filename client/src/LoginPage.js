import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginUserToStore } from "./reducers/user";
import { setNotification } from "./reducers/notification";
import { useField } from "./hooks/input";

import Notification from "./components/Notification";

import loginService from "./services/login";
import registerService from "./services/register";
import userService from "./services/user";

const RegisterForm = ({ form, setForm }) => {
  const dispatch = useDispatch();

  const name = useField("text");
  const username = useField("text");
  const password = useField("password");

  const handleSubmit = (event) => {
    event.preventDefault();
    registerService
      .register({
        username: username.fields.value,
        name: name.fields.value,
        password: password.fields.value,
      })
      .then(() => {
        dispatch(setNotification({
          message: "register successfully",
        }));
        name.reset();
        username.reset();
        password.reset();
        setForm("login");
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

  const handleCancel = () => {
    name.reset();
    username.reset();
    password.reset();
    setForm("login");
  };

  if (form === "login") {
    return null;
  }

  return (
    <>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
					name <input {...name.fields} />
        </div>
        <div>
					username <input {...username.fields} />
        </div>
        <div>
					password <input {...password.fields} />
        </div>
        <button id="register-button" type="submit">Register</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
};

const LoginForm = ({ form, setForm }) => {
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

  const handleCancel = () => {
    username.reset();
    password.reset();
    setForm("register");
  };

  if (form === "register") {
    return null;
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
					username <input {...username.fields}/>
        </div>
        <div>
					password <input {...password.fields}/>
        </div>
        <button id="login-button" type="submit">Login</button>
        <button type="butoon" onClick={handleCancel}>Register</button>
      </form>
    </div>
  );
};

const LoginPage = () => {
  const [form, setForm] = useState("login");

  return (
    <>
      <Notification />
      <LoginForm form={form} setForm={setForm} />
      <RegisterForm form={form} setForm={setForm} />
    </>
  );
};

export default LoginPage;
