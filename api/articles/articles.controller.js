const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const articleService = require("./article.service");

class articleController {
  async create(req, res, next) {
    try {
      const article = await articleService.create(req.body);

      req.io.emit("article:createArticle", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const articleModified = await articleService.updateArticle(id, data);

        if (req.user.role != "admin") { // Vérifier si l'utilisateur est un "admin"
        throw new UnauthorizedError("Seulement les admins peuvent modifier les articles.");
        }

      res.json(articleModified);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;

      if (req.user.role != "admin") { // Vérifier si l'utilisateur est un "admin"
        throw new UnauthorizedError("Seulement les admins peuvent modifier les articles.");
        }
        
      await articleService.delete(id);
      req.io.emit("article:deleteArticle", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

}

module.exports = new articleController();