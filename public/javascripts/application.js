$(function($) {
  var article_content_block = $('.article-show .article-content');

  // 评论框
  $('input#content').focus(function() {
    $('div.named').show();
  });

  // 过略符号
  var content = $(article_content_block).html();
  $(article_content_block).empty();
  content = content.replace(/&lt;/g, '<').replace(/(&gt;)|( &gt; )/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  $(article_content_block).html(content);
});