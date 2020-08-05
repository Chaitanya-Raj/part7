import React, { useState, useEffect } from "react";
import {
  // ...
  useParams,
} from "react-router-dom";
import Axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    let isMounted = true;

    Axios.get("http://localhost:3001/api/users").then((response) => {
      if (isMounted) setUsers(response.data);
    });
    return () => {
      isMounted = false;
    };
  });

  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>{user.name}</h2>
      <h3 style={{ marginTop: "20px" }}>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id} style={{ listStyle: "square" }}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
