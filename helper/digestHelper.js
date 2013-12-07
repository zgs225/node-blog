/**
 * Created by yuez on 13-12-7.
 */
var close_symbol = "> ] }";
var open_symbol = "< [ {";

var DigestHelper= function() {};

/**
 * 用来截取markdown语法的文章片段
 * 不破坏文章结构位原则
 * @param article_body 文章
 * @param digest_length 摘要长度
 * @returns {string} 摘要
 */
DigestHelper.prototype.digest = function(article_body, digest_length) {
  var contentArray = [];
  var count = 0;
  var return_flag = 0; // 如果有open_symbol +1,出现close_symbol -1, 为零才能返回
  if(!article_body) return "";
  if(article_body.length <= digest_length)
    return article_body;

  for(var i=0; i<article_body.length; i++) {
    if(count >= digest_length && return_flag === 0) break;
    if(open_symbol.indexOf(article_body[i]) != -1)
      return_flag ++;
    else if(close_symbol.indexOf(article_body[i]) != -1)
      return_flag --;
    contentArray.push(article_body[i]);
    count ++;
  }
  return contentArray.join("");
};

exports.DigestHelper = DigestHelper;
