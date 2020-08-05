import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { newComment, likeBlog, removeBlog } from "../reducers/blogReducer";
import { Button, Form } from "react-bootstrap";

const Blog = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const user = useSelector((store) => store.user);
  const blogs = useSelector((store) => store.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  const handleComment = async (event) => {
    event.preventDefault();
    dispatch(newComment({ content: comment, blog: blog.id }));
    setComment("");
  };

  if (!blog || !user) {
    return null;
  }

  return (
    <div className="blog" style={{ marginTop: "30px" }}>
      <h2>{blog.title}</h2>
      <a href={blog.url} style={{ margin: "10px" }}>
        {blog.url}
      </a>
      <div style={{ margin: "10px" }}>
        {blog.likes} likes{" "}
        <Button
          onClick={() => dispatch(likeBlog(blog))}
          variant="secondary"
          size="sm"
        >
          like
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        added by {blog.user.name}{" "}
        {user.username === blog.user.username && (
          <Button
            onClick={() => dispatch(removeBlog(blog))}
            variant="secondary"
            size="sm"
          >
            remove
          </Button>
        )}
      </div>

      <h3 style={{ marginTop: "30px" }}>comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Control
          type="text"
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" style={{ marginTop: "10px" }}>
          add comment
        </Button>
      </Form>
      <ul style={{ marginTop: "20px" }}>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
