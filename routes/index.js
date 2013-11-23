var ArticleProvider = require('../provider/article').ArticleProvider;
var articleProvider = new ArticleProvider('localhost', 27017);

/*
 * GET home page.
 */

exports.index = function(req, res){
  var restraint = {
    start: 0,
    limit: 5,
    sortBy: { created_at: -1 }
  };
  var pageMeta;
  articleProvider.counter(restraint, function(error, result) {
    pageMeta = {
      current: 1,
      total: result % 5 == 0 ? result / 5 : (result - result % 5) / 5 + 1
    }
  });
  articleProvider.pagination(restraint, function(error, articles) {
    res.render('index', {title: "乐正的博客——专注、简单与热爱生活", articles: articles, page: pageMeta});
  });
};

/*
 * paginating index
 */
exports.pages = function(req, res) {
  var restraint = {
    start: (req.params.index - 1) * 5,
    limit: 5,
    sortBy: { created_at: -1}
  };
  var pageMeta;
  articleProvider.counter(restraint, function(error, result) {
    pageMeta = {
      current: req.params.index,
      total: result % 5 == 0 ? result / 5 : (result - result % 5) / 5 + 1
    }
  });
  articleProvider.pagination(restraint, function(error, articles) {
    res.render('index', {title: "乐正的博客——专注、简单与热爱生活", articles: articles, page: pageMeta});
  });
};

/*
 * admin panel
 */
exports.admin = function(req, res) {
  var restraint = {
    start: 0,
    limit: 10,
    sortBy: {created_at: -1}
  };
  articleProvider.pagination(restraint, function(error, articles) {
    res.render('admin', {
      title: "我是一名管理君——乐正",
      articles:articles
    });
  });
};
