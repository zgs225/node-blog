var ArticleProvider = require('../provider/article').ArticleProvider;
var articleProvider = new ArticleProvider('localhost', 27017);
var DigestHelper    = require('../helper/digestHelper').DigestHelper;
var digestHelper    = new DigestHelper();

var S = require('string');
/*
 * GET home page.
 */

exports.index = function(req, res){
  var limit = 5;
  var restraint = {
    start: 0,
    limit: limit,
    sortBy: { created_at: -1 }
  };
  var pageMeta;
  articleProvider.counter(restraint, function(error, result) {
    pageMeta = {
      current: 1,
      total: result % limit == 0 ? result / limit : (result - result % limit) / limit + 1
    }
  });
  articleProvider.pagination(restraint, function(error, articles) {
    for(var i=0; i<articles.length; i++) {
      var url = '\n\n [Read more](/blog/{{_id}})';
      var value = { '_id': articles[i]._id };
      articles[i].content =  digestHelper.digest(articles[i].content, 200) + S(url).template(value).s;
    }
    res.render('index', {title: "乐正的博客——专注、简单与热爱生活", articles: articles, page: pageMeta});
  });
};

/*
 * paginating index
 */
exports.pages = function(req, res) {
  var limit = 5;
  var restraint = {
    start: (req.params.index - 1) * limit,
    limit: limit,
    sortBy: { created_at: -1}
  };
  var pageMeta;
  articleProvider.counter(restraint, function(error, result) {
    pageMeta = {
      current: req.params.index,
      total: result % limit == 0 ? result / limit : (result - result % limit) / limit + 1
    }
  });
  articleProvider.pagination(restraint, function(error, articles) {
    for(var i=0; i<articles.length; i++) {
      var url = '\n\n [Read more](/blog/{{_id}})';
      var value = { '_id': articles[i]._id };
      articles[i].content =  digestHelper.digest(articles[i].content, 200) + S(url).template(value).s;
    }
    res.render('index', {title: "乐正的博客——专注、简单与热爱生活", articles: articles, page: pageMeta});
  });
};

/*
 * admin panel
 */
exports.adminPagination = function(req, res) {
  var limit = 10;
  var restraint = {
    start: (req.params.index - 1) * limit,
    limit: limit,
    sortBy: { created_at: -1}
  };
  var pageMeta;
  articleProvider.counter(restraint, function(error, result) {
    pageMeta = {
      current: req.params.index,
      total: result % limit == 0 ? result / limit : (result - result % limit) / limit + 1
    }
  });
  articleProvider.pagination(restraint, function(error, articles) {
    res.render('admin', {
      title: "我是一名管理君——乐正",
      articles:articles,
      page: pageMeta
    });
  });
};

exports.admin = function(req, res) {
  var limit = 10;
  var restraint = {
    start: 0,
    limit: limit,
    sortBy: { created_at: -1 }
  };
  var pageMeta;
  articleProvider.counter(restraint, function(error, result) {
    pageMeta = {
      current: 1,
      total: result % limit == 0 ? result / limit : (result - result % limit) / limit + 1
    }
  });
  articleProvider.pagination(restraint, function(error, articles) {
    res.render('admin', {
      title: "我是一名管理君——乐正",
      articles:articles,
      page: pageMeta
    });
  });
};
