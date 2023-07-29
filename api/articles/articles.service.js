const Article = require('./articles.schema');


class ArticleService {
    createArticle(userId, data) {
        // Vérifier si l'utilisateur est connecté
        if (!userId) {
          throw new Error("pas connecté.");
        }
      
        const article = new Article(data);
        return article.save();
      }

    updateArticle(id, data) {
        return Article.findByIdAndUpdate(id, data, { new: true });
    }

    deleteArticle(id) {
        return Article.deleteOne({ _id: id });
      }
  }


module.exports = new ArticleService();
