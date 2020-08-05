import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import storage from "../utils/storage";
import { setNotification } from "../reducers/notificationReducer";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUsername("");
      setPassword("");
      dispatch(setUser(user));
      dispatch(
        setNotification({
          message: `Welcome back, ${user.name}!`,
          type: "success",
        })
      );
      storage.saveUser(user);
    } catch (exception) {
      dispatch(
        setNotification({ message: "wrong username/password", type: "error" })
      );
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" id="login">
          login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
