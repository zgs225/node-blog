$(function ($) {
  var remove_confirm_block = '<div class="self-modal"><div class="header">删除?</div><div class="body"><p>你确认要删除我吗？</p><button class="btn btn-default btn-danger confirm" onclick="deleteArticle()">确认</button><button class="btn btn-default cancel" onclick="cancel()">取消</button> </div> </div>';

  // 评论框
  $('textarea#content').focus(function () {
    $('div.named').show();
  });

  // image preview
  $('input[type="file"][name="image"]').change(function () {
    readURL(this);
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.img-prev').attr('src', e.target.result).show();
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      $('.img-prev').hide();
    }
  }

  // article preview
  $('button.btn-prev').click(function () {
    $('.article-prev').show();
  });

  $('.article-prev .cancel').click(function () {
    $('.article-prev').hide();
  });

  // enable tab in textarea
  $(document).delegate('textarea', 'keydown', function (e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
      e.preventDefault();
      var start = $(this).get(0).selectionStart;
      var end = $(this).get(0).selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      $(this).val($(this).val().substring(0, start) + "\t" + $(this).val().substring(end));

      // put caret at right position again
      $(this).get(0).selectionStart =
          $(this).get(0).selectionEnd = start + 1;
    }
  });

  // Remove article
  $('.recent-article .remove').click(function () {
    $('body').append($(remove_confirm_block).attr('id', $(this).parent().parent().attr('id')));
  });

  $('.recent-article .edit').click(function () {
    $('form').hide();
    $('.recent-article .slideUp').hide();
    $(this).parent().parent().find('li .slideUp').show();
    $(this).parent().parent().next('form').show('1000');
  });

  $('.recent-article .slideUp').click(function () {
    $(this).hide();
    $(this).parent().parent().next('form').hide('1000');
  });
});

function cancel() {
  var ele = document.getElementsByClassName('self-modal')[0];
  ele.parentNode.removeChild(ele);
}

function deleteArticle() {
  var xmlhttp;
  var id = document.getElementsByClassName('self-modal')[0].id;
  var ele = document.getElementsByClassName('self-modal')[0];
  console.log(id);
  if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
  else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  xmlhttp.open('delete', '/blog/' + id, false);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var e = document.getElementById(id).parentNode;
      e.parentNode.removeChild(e);
    }
  };
  xmlhttp.send();
  ele.parentNode.removeChild(ele); // 删除对话框
}
