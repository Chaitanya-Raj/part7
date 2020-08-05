const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");
const helper = require("../utils/helper");

const api = supertest(app);

beforeEach(async () => {
  jest.setTimeout(20000);

  await Blog.deleteMany({});

  for (let blog of helper.blogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

afterAll(async () => {
  await Blog.deleteMany({});
  mongoose.connection.close();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 6 blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(6);
});

test("each blog contains an id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((res) => {
    expect(res.id).toBeDefined();
  });
});

test("add a new blog", async () => {
  const blog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  };
  const res = await api.post("/api/blogs").send(blog).expect(201);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);
});

test("if no like property is given, it defaults to zero", async () => {
  const blog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };
  const res = await api.post("/api/blogs").send(blog).expect(201);

  expect(res.body.likes).toBe(0);
});

test("if no title and url properties are given, it return 400", async () => {
  const blog = {
    author: "test",
    likes: 69,
  };

  const res = await api.post("/api/blogs").send(blog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogs.length);
});

test("update the likes", async () => {
  const blog = {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 7,
    __v: 0,
  };

  const res = await api.put("/api/blogs/5a422ba71b54a676234d17fb").send(blog);

  expect(res.body.likes).toBe(7);
});

test("delete a blog", async () => {
  const res = await api
    .delete("/api/blogs/5a422a851b54a676234d17f7")
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);
});
