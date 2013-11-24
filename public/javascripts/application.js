$(function($) {
  var article_content_block = $('.article-show .article-content');
  var article_summary_block = $('.article-summary .article-summary-content');
  var remove_confirm_block  = '<div class="self-modal"><div class="header">Confirm?</div><div class="body"><p>Do you want to delete the article?</p><button class="btn btn-default btn-danger confirm">Confirm</button><button class="btn btn-default cancel">Cancel</button> </div> </div>';

  // 评论框
  $('textarea#content').focus(function() {
    $('div.named').show();
  });

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

  // Remove article
  $('.recent-article .remove').click(function() {
    $('body').append($(remove_confirm_block).attr('id', $(this).parent().parent().attr('id')));
  });

});
