/**
 * Created by yuez on 13-11-3.
 * 储存博客文章
 */
var Db         = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server     = require('mongodb').Server;
var BSON       = require('mongodb').BSON;
var ObjectID   = require('mongodb').ObjectID;
var moment     = require('moment');

var ArticleProvider = function (host, port) {
  this.db = new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function () {
  });
};

ArticleProvider.prototype.getCollection = function (callback) {
  this.db.collection('articles', function (error, article_collection) {
    if (error) callback(error);
    else callback(null, article_collection)
  });
};

ArticleProvider.prototype.findAll = function (callback) {
  this.getCollection(function (error, article_collection) {
    if (error) callback(error);
    else {
      article_collection.find().sort({created_at: -1}).toArray(function (error, results) {
        if (error) callback(error);
        else callback(null, results)
      });
    }
  });
};

ArticleProvider.prototype.counter = function(option, callback) {
  this.getCollection(function(error, article_collection) {
    if(error) callback(error);
    else {
      article_collection.find(option.conditions).count(function(error, result) {
        if(error) callback(error);
        else callback(null, result);
      });
    }
  });
};

ArticleProvider.prototype.pagination = function(option, callback) {
  this.getCollection(function(error, article_collection) {
    if(error) callback(error);
    else {
      article_collection.find(option.conditions).skip(option.start).limit(option.limit).sort(option.sortBy).toArray(function(error, results) {
        if(error) callback(error);
        else callback(null, results);
      });
    }
  });
};

ArticleProvider.prototype.findById = function (id, callback) {
  this.getCollection(function (error, article_collection) {
    if (error) callback(error);
    else {
      article_collection.findOne(
          {_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)},
          function (error, result) {
            if (error) callback(error);
            else callback(null, result)
          });
    }
  });
};

ArticleProvider.prototype.save = function (articles, callback) {
  this.getCollection(function (error, article_collection) {
    if (error) callback(error);
    else {
      if (typeof(articles.length) == "undefined")
        articles = [articles];

      for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        article.created_at = new Date();
        if (article.comments === undefined)
          article.comments = [];
        for (var j = 0; j < article.comments.length; i++) {
          article.comments[j].created_at = new Date();
        }
        if (article.tags === undefined)
          article.tags = [];
      }
      article_collection.insert(articles, function () {
        callback(null, articles);
      });
    }
  });
};

ArticleProvider.prototype.deleteArticle = function(article, callback) {
  this.getCollection(function(error, article_collection) {
    if(error) callback(error);
    else {
      if(article == null) return;
      article_collection.remove(article, function(error) {
        if(error) callback(error);
      });
    }
  });
};

ArticleProvider.prototype.update = function(article, callback) {
  this.getCollection(function(error, article_collection) {
     if(error) callback(error);
    else {
       article_collection.update({_id: article._id}, {$set: {title: article.title, content: article.content}}, function(error, article) {
         if(error) callback(error);
         else callback(null, article);
       });
     }
  });
};

ArticleProvider.prototype.addCommentToArticle = function (articleId, comment, callback) {
  this.getCollection(function (error, article_collection) {
    if (error) callback(error);
    else {
       article_collection.update(
           {_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(articleId)},
           {'$push': {comments: comment}},
           function(error, article) {
             if(error) callback(error);
             else callback(null, article);
           }
       );
    }
  });
};

exports.ArticleProvider = ArticleProvider;
