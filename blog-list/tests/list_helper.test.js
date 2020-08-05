const helper = require("../utils/helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = helper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = helper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = helper.totalLikes(helper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = helper.totalLikes(helper.blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("is the blog with the most likes", () => {
    const result = helper.favoriteBlog(helper.blogs);
    expect(result.likes).toEqual(12);
  });
});

describe("most blogs", () => {
  test("are by the author Robert C. Martin", () => {
    const result = helper.mostBlogs(helper.blogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});

describe("most likes", () => {
  test("on all blogs of any author is 17", () => {
    const result = helper.mostLikes(helper.blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
