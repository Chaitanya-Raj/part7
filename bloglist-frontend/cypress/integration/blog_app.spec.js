describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user1 = {
      name: "Chaitanya",
      username: "grimnir",
      password: "lolxd",
    };
    const user2 = {
      name: "subhoshree",
      username: "kuhu",
      password: "lol",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user1);
    cy.request("POST", "http://localhost:3001/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("grimnir");
      cy.get("#password").type("lolxd");
      cy.get("#login-button").click();

      cy.get(".success")
        .should("contain", "Successfully logged in")
        .and("have.css", "color", "rgb(0, 128, 0)");

      cy.get("html").should("contain", "Chaitanya logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("grimnir");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "Chaitanya logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "grimnir", password: "lolxd" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("test-title");
      cy.get("#author").type("test-author");
      cy.get("#url").type("test-url");
      cy.get("#create").click();

      cy.get("html")
        .should("contain", "test-title")
        .and("contain", "test-author");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test-title",
          author: "test-author",
          url: "test-url",
        });
      });

      it("it can be liked", function () {
        cy.contains("test-title").contains("view").click();

        cy.contains("0").contains("like").click();

        cy.contains("1");
      });

      it("it can be deleted by the same user", function () {
        cy.contains("test-title").contains("view").click();

        cy.contains("remove").click();

        cy.should("not.contain", "test-title");
      });

      it("it cannot be deleted by another user", function () {
        cy.logout();
        cy.login({ username: "kuhu", password: "lol" });

        cy.contains("test-title").contains("view").click();

        cy.get("html").should("not.contain", "remove");
      });

      describe("and another blog is added", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "alt-title",
            author: "alt-author",
            url: "alt-url",
            likes: 7,
          });
          cy.createBlog({
            title: "x-title",
            author: "x-author",
            url: "x-url",
            likes: 12,
          });
        });

        it("the blogs are sorted in order of most likes", function () {
          cy.contains("test-title").contains("view").click();
          cy.contains("alt-title").contains("view").click();
          cy.contains("x-title").contains("view").click();
          cy.get("#container")
            .find(".likes")
            .then((likes) => {
              let copy = [];
              for (let i = 0; i < likes.length; i++) {
                copy.push(likes.get(i).innerText.split(" ")[0]);
              }
              copy = copy.map((c) => parseInt(c));
              let sortedLikes = copy.slice().sort((a, b) => b - a);
              copy.forEach((c, i) => cy.expect(c).equal(sortedLikes[i]));
            });
        });
      });
    });
  });
});
