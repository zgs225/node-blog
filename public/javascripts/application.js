$(function($) {
  var article_content_block = $('.article-show .article-content');

  // 评论框
  $('input#content').focus(function() {
    $('div.named').show();
  });

  // 过略符号
  var content = $(article_content_block).html();
  $(article_content_block).empty();
  content = content.replace(/&lt;/gi, '<').replace(/(&gt;)|( &gt; )/gi, '>').replace(/&#39;/gi, '\'');
  $(article_content_block).html(content);
});