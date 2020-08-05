import blogService from "../services/blogs";
import commentService from "../services/comments";
import { setNotification } from "../reducers/notificationReducer";

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT",
      data: blogs,
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch({ type: "ADD_NEW", data: newBlog });
      dispatch(
        setNotification({
          message: `a new blog '${newBlog.title}' by ${newBlog.author} added!`,
          type: "success",
        })
      );
    } catch (exception) {
      dispatch(
        setNotification({
          message: "unable to add a new blog",
          type: "error",
        })
      );
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (ok) {
      await blogService.remove(blog.id);
      dispatch({ type: "REMOVE", id: blog.id });
      dispatch(
        setNotification({
          message: "successfully removed blog",
          type: "success",
        })
      );
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    const updatedBlog = await blogService.update(likedBlog);
    dispatch({ type: "LIKE", updatedBlog });
  };
};

export const newComment = (comment) => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      let updatedBlog = blogs.find((blog) => blog.id === comment.blog);
      const createdComment = await commentService.create(comment);
      updatedBlog.comments = updatedBlog.comments.concat(createdComment);
      dispatch({ type: "COMMENT", updatedBlog });
      dispatch(
        setNotification({
          message: "a new comment added!",
          type: "success",
        })
      );
    } catch (exception) {
      dispatch(
        setNotification({
          message: "unable to add a new comment",
          type: "error",
        })
      );
    }
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "LIKE":
      return state.map((s) =>
        s.id === action.updatedBlog.id ? action.updatedBlog : s
      );
    case "ADD_NEW":
      return [...state, action.data];
    case "REMOVE":
      return state.filter((s) => s.id !== action.id);
    case "INIT":
      return action.data;
    case "COMMENT":
      return state.map((s) =>
        s.id === action.updatedBlog.id ? action.updatedBlog : s
      );
    default:
      return state;
  }
};

export default blogReducer;
