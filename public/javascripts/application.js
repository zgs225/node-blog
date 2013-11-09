$(function($) {
  var article_content_block = $('.article-show .article-content');
  var article_summary_block = $('.article-summary .article-summary-content');

  // 评论框
  $('input#content').focus(function() {
    $('div.named').show();
  });

  // 过略符号
  if(article_content_block.length > 0) {
    var content = $(article_content_block).html();
    $(article_content_block).empty();
    try {
      content = content.replace(/&lt;/g, '<').replace(/(&gt;)|( &gt; )/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    } catch(e) {
      console.log(e);
    }
    $(article_content_block).html(content);
  }

  if(article_summary_block.length > 0) {
    var summary = $(article_summary_block).html();
    $(article_summary_block).empty();
    try {
      summary = summary.replace(/&lt;/g, '<').replace(/(&gt;)|( &gt; )/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    } catch(e) {
      console.log(e);
    }
    $(article_summary_block).html(summary);
  }
});