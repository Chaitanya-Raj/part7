import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import storage from "./utils/storage";

import Header from "./components/Header";
import Home from "./components/Home";
import User from "./components/User";
import Users from "./components/Users";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = storage.loadUser();
    dispatch(setUser(user));
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span" style={{ marginTop: "4px" }}>
                <Link to="/" style={{ color: "white" }}>
                  blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span" style={{ marginTop: "4px" }}>
                <Link to="/users" style={{ color: "white" }}>
                  users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Header />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Notification style={{ marginTop: "30px" }} />
        <div className="container">
          <h2 style={{ marginTop: "30px" }}>blog app</h2>
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
