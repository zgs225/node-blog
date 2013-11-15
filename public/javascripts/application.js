$(function($) {
  var article_content_block = $('.article-show .article-content');
  var article_summary_block = $('.article-summary .article-summary-content');

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

  // image preview
  $('input[type="file"][name="image"]').change(function() {
    readURL(this);
  });

  function readURL(input) {
    if(input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('.img-prev').attr('src', e.target.result).show();
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      $('.img-prev').hide();
    }
  }

  // article preview
  $('button.btn-prev').click(function() {
    $('.article-prev').show();
  });

  $('.article-prev .cancel').click(function() {
    $('.article-prev').hide();
  });

  // enable tab in textarea
  $(document).delegate('#content', 'keydown', function(e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
      e.preventDefault();
      var start = $(this).get(0).selectionStart;
      var end = $(this).get(0).selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      $(this).val($(this).val().substring(0, start)
          + "\t"
          + $(this).val().substring(end));

      // put caret at right position again
      $(this).get(0).selectionStart =
          $(this).get(0).selectionEnd = start + 1;
    }
  });
});

