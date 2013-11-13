$(function($) {
  var article_content_block = $('.article-show .article-content');
  var article_summary_block = $('.article-summary .article-summary-content');
  var article_archive       = $('.content .archives');

  var fullscreen  = "<span class='glyphicon glyphicon-resize-full' title='全屏'></span> ";
  var resetscreen = "<span class='glyphicon glyphicon-resize-small' title='恢复'></span> ";

  // 评论框
  $('input#content').focus(function() {
    $('div.named').show();
  });

  // 过滤符号
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
    $.each(article_summary_block, function(i, article_summary) {
      var summary = $(this).html();
      $(this).empty();
      try {
        summary = summary.replace(/&lt;/g, '<').replace(/(&gt;)|( &gt; )/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
      } catch(e) {
        console.log(e);
      }
      $(this).html(summary);
    });
  }
});