const commentRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  try {
    const blog = await Blog.findById(request.params.id);
    const comment = new Comment({
      content: body.content,
      blog: blog._id,
    });

    try {
      const savedComment = await comment.save();
      blog.comments = blog.comments.concat(savedComment._id);
      await blog.save();
      response.status(201).json(savedComment.toJSON());
    } catch (error) {
      response.status(400).end();
    }
  } catch (error) {
    return response.status(401).json({ error: "something went wrong" });
  }
});

module.exports = commentRouter;
