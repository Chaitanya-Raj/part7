import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((store) => store.notification);

  if (!notification) {
    return null;
  }

  const varient =
    notification.type === "success" ? notification.type : "danger";

  return <Alert variant={varient}>{notification.message}</Alert>;
};

export default Notification;
