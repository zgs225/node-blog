
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var moment = require('moment');

var ArticleProvider = require('./provider/article').ArticleProvider;
var articleProvider = new ArticleProvider('localhost', 27017);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// helper
app.locals.moment = require('moment');
app.locals.markdown = require('markdown').markdown;
app.locals.entities = require('entities');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// home page
app.get('/', function(req, res) {
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
});

app.get('/page/:index', function(req, res) {
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
});

// archives
app.get('/archives', function(req, res) {
  articleProvider.findAll(function(error, articles) {
    var archives = [];
    for(var i=0; i<articles.length; i++) {
      var article = articles[i];
      var year = moment(article.created_at).format('YYYY');
      var month = moment(article.created_at).format('MM');
      if(archives.length == 0) {
        archives.push({
          year: year,
          months: [month]
        });
        continue;
      }
      var existY = false;
      var existM = false;
      for(var j=0; j<archives.length; j++) {
        if(archives[j].year == year) {
          for(var m=0; m<archives[j].months.length; m ++) {
            if(archives[j].months[m] == month) {
              existM = true;
              break;
            }
          }
          if(!existM) {
            archives[j].months.push(month);
          }
          existY = true;
          break;
        }
      }
      if(!existY) {
        var archive = {
          year: year,
          months: [month]
        };
        archives.push(archive);
      }
    }
    res.render('archives', {title: "归档——乐正的博客", archives: archives, articles: articles});
  });
});

// intro
app.get('/intro', function(req, res) {
  res.render('intro', {title: "简介"});
});

// new blog
app.get('/blog/new', function(req, res) {
  res.render('new', {title: '新的日志'});
});

app.post('/blog/new', function(req, res) {
  articleProvider.save({
    title: req.param('title'),
    content: req.param('content'),
    img: req.param('image') == null ? '/images/article-heading.jpg' : req.param('image'),
    tags: req.param('tags').split(/,|，/g)
  }, function() {
    res.redirect('/');
  });
});

app.get('/blog/:id', function(req, res) {
  articleProvider.findById(req.params.id, function(error, article) {
    res.render('show', {title: article.title, article: article});
  });
});

app.post('/blog/commenting', function(req, res) {
  articleProvider.addCommentToArticle(req.param('articleId'), {
    author: req.param('author'),
    content: req.param('content'),
    created_at: new Date()
  }, function(error, article) {
    res.redirect('/blog/' + req.param('articleId'));
  });
});

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
