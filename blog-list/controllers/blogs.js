const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      comments: body.comments || [],
      likes: body.likes || 0,
      user: user._id,
    });

    try {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog.toJSON());
    } catch (error) {
      response.status(400).end();
    }
  } catch (error) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    try {
      const blog = await Blog.findById(request.params.id);
      if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
      } else {
        response.sendStatus(401);
      }
    } catch (error) {
      response.sendStatus(400);
    }
  } catch (error) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
