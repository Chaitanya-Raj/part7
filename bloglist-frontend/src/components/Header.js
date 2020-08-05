import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import storage from "../utils/storage";
import { clearUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Button } from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(clearUser());
    storage.logoutUser();
    dispatch(
      setNotification({
        message: "Succesfully logged out",
        type: "success",
      })
    );
    history.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <span>
      {user.name} logged in
      <Button
        variant="secondary"
        onClick={handleLogout}
        style={{ marginLeft: "10px" }}
      >
        logout
      </Button>
    </span>
  );
};

export default Header;
