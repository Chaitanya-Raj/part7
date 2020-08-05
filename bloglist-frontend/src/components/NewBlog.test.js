import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import { act } from "react-dom/test-utils";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();
  const toggleVisibility = jest.fn();

  const component = render(
    <BlogForm handleCreate={createBlog} toggleVisibility={toggleVisibility} />
  );

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  act(() => {
    fireEvent.change(title, {
      target: { value: "How to test react apps" },
    });
    fireEvent.change(author, {
      target: { value: "Eddie" },
    });
    fireEvent.change(url, {
      target: {
        value: "https://fullstackopen.com/en/part5/testing_react_apps",
      },
    });
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("How to test react apps");
  expect(createBlog.mock.calls[0][0].author).toBe("Eddie");
  expect(createBlog.mock.calls[0][0].url).toBe(
    "https://fullstackopen.com/en/part5/testing_react_apps"
  );
});
