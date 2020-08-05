import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Togglable from "./Togglable";
import LoginForm from "./LoginForm";
import NewBlog from "./NewBlog";

const Home = () => {
  const user = useSelector((store) => store.user);
  const blogs = useSelector((store) => store.blogs);

  const blogFormRef = useRef();

  if (!user) {
    return <LoginForm />;
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div style={{ marginTop: "30px" }}>
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ marginTop: "30px" }}
      >
        <tbody>
          {blogs.sort(byLikes).map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`} style={{ color: "white" }}>
                  {blog.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef} />
      </Togglable>
    </div>
  );
};

export default Home;
