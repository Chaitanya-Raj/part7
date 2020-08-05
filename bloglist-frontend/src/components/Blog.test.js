import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders only the title and author by default", () => {
  const blog = {
    title: "How to test react apps",
    author: "Chaitanya",
    url: "https://fullstackopen.com/en/part5/testing_react_apps",
    likes: 5,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("How to test react apps");
  expect(component.container).toHaveTextContent("Chaitanya");

  expect(component.container).not.toHaveTextContent(
    "https://fullstackopen.com/en/part5/testing_react_apps"
  );
  expect(component.container).not.toHaveTextContent("5");
});

test("renders the title, author, url and likes on button click", () => {
  const blog = {
    title: "How to test react apps",
    author: "Eddie",
    url: "https://fullstackopen.com/en/part5/testing_react_apps",
    likes: 5,
    user: {
      username: "grimnir",
      name: "Chaitanya",
    },
  };

  const component = render(<Blog blog={blog} user={{ username: "grimnir" }} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("How to test react apps");
  expect(component.container).toHaveTextContent("Eddie");

  expect(component.container).toHaveTextContent(
    "https://fullstackopen.com/en/part5/testing_react_apps"
  );
  expect(component.container).toHaveTextContent("5");
});

test("clicking the like button twice calls the likeBlog function twice", () => {
  const blog = {
    title: "How to test react apps",
    author: "Eddie",
    url: "https://fullstackopen.com/en/part5/testing_react_apps",
    likes: 5,
    user: {
      username: "grimnir",
      name: "Chaitanya",
    },
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} user={{ username: "grimnir" }} likeBlog={mockHandler} />
  );

  const button = component.getByText("view");
  fireEvent.click(button);

  const like = component.getByText("like");
  fireEvent.click(like);
  fireEvent.click(like);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
