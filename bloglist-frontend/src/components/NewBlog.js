import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { createBlog } from "../reducers/blogReducer";

const NewBlog = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title,
        author,
        url,
      })
    );

    setTitle("");
    setAuthor("");
    setUrl("");

    blogFormRef.current.toggleVisibility();
  };

  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setUrl("");

    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" id="create">
          create
        </Button>
        <Button
          variant="secondary"
          type="reset"
          onClick={handleReset}
          style={{ marginLeft: "10px" }}
        >
          cancel
        </Button>
      </Form>
    </div>
  );
};

export default NewBlog;
