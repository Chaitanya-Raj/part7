import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Table } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    Axios.get("http://localhost:3001/api/users").then((response) => {
      if (isMounted) setUsers(response.data);
    });
    return () => {
      isMounted = false;
    };
  });

  const byCount = (b1, b2) => b2.blogs.length - b1.blogs.length;

  return (
    <div>
      <h2 style={{ marginTop: "30px" }}>Users</h2>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}></th>
            <th style={{ textAlign: "center" }}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.sort(byCount).map((user) => (
            <tr key={user.id}>
              <td style={{ textAlign: "center" }}>
                <Link to={`/users/${user.id}`} style={{ color: "white" }}>
                  {user.name}
                </Link>
              </td>
              <td style={{ textAlign: "center" }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
