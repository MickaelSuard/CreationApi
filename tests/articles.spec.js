const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");
const articlesService = require("../api/articles/articles.service");

describe("tester API articles", () => {
  let token;
  const USER_ID = "fake";
  const MOCK_DATA = [
    {
      _id: USER_ID,
      title: "titre",
      content: "contenu",
    },
  ];
  const MOCK_DATA_CREATED = {
      title: "titreTest",
      content: "contenuTest",
  };

  beforeEach(() => {
    token = jwt.sign({ articleId: USER_ID }, config.secretJwtToken);
    // mongoose.Query.prototype.find = jest.fn().mockResolvedValue(MOCK_DATA);
    mockingoose(Article).toReturn(MOCK_DATA, "find");
    mockingoose(Article).toReturn(MOCK_DATA_CREATED, "save");
  });


  test("[articles] Create articles", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_DATA_CREATED)
      .set("x-access-token", token);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(MOCK_DATA_CREATED.title);
  });

  test("Est-ce articlesService.updateArticle", async () => {
    const spy = jest
      .spyOn(usersService, "updateArticle")
      .mockImplementation(() => "test");
    await request(app).get("/api/users").set("x-access-token", token);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturnedWith("test");
  });

  test("Est-ce articlesService.deleteArticle", async () => {
    const spy = jest
      .spyOn(usersService, "deleteArticle")
      .mockImplementation(() => "test");
    await request(app).get("/api/users").set("x-access-token", token);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturnedWith("test");
  });


  afterEach(() => {
    jest.restoreAllMocks();
  });
});
