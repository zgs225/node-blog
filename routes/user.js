var Validator   = require('validator').Validator;
var MongoClient = require('mongodb').MongoClient;
var bcrypt      = require('bcrypt');

var login_title = "登录——乐正的博客";

Validator.prototype.error = function(msg) {
  this._errors.push(msg);
  return this;
};

Validator.prototype.getErrors = function() {
  return this._errors;
};
/*
 * GET users listing.
 */
exports.list = function(req, res){
  res.send("respond with a resource");
};

/*
 * GET login form
 */
exports.logForm = function(req, res) {
  res.render('login', {
    title: login_title,
    errors: {}
  });
};

/*
 * Login
 */
exports.login = function(req, res) {
  // Validate data
  var validator = new Validator();
  validator.check(req.param("username").toLowerCase(), {
    len: "用户名长度至少为4位",
    notEmpty: "用户名不能为空"
  }).len(4).notEmpty();
  validator.check(req.param("password"), {
    len: "密码至少为6位",
    notEmpty: "密码不能为空"
  }).len(6).notEmpty();
  var errors = validator.getErrors();
  if(errors && errors.length && errors.length > 0) {
    res.render('login', {
      title: login_title,
      errors: errors
    });
  }

  // Do login
  MongoClient.connect('mongodb://localhost:27017/node-mongo-blog', function(err, db) {
    if(err) throw err;
    var collection = db.collection('users');
    collection.findOne({
      username: req.param("username")
    }, function(err, user) {
      db.close();
      if(!user) {
        res.render('login', {
          title: login_title,
          errors: ["不存在此用户"]
        })
      } else {
        if(!bcrypt.compareSync(user.password, bcrypt.hashSync(req.param("password"), bcrypt.genSaltSync(10)))) {
          res.render('login', {
            title: login_title,
            errors: ["不存在此用户"]
          })
        }
        req.session.user = user;
        res.redirect('/admin');
      }
    });
  });
};

exports.logout = function(req, res) {
  req.session.user = null;
  res.redirect('/');
};