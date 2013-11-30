/**
 * @Copyright <a href='mailto:zgs225@gmail.com'>乐正</a>
 * 2013年11月26日
 */
$(function ($) {
  // display code block as table
  var codeBlocks = $('pre code');
  $(codeBlocks).each(function (i, code_block) {
    var div = $('<div class="code-wrapper"></div> ');
    var table = $('<table class="code-block "></table>');
    var tbody = $('<tbody></tbody>');
    var tr_ele = $('<tr class="codes"></tr>');
    var line_num = $('<td class="line-num"></td>');
    var line_code = $('<td class="line-code"></td>');
    var pre = $('<pre class="prettyprint"></pre>');
    var codes = $(code_block).html().split('\n');
    for (var j = 0; j < codes.length; j++) {
      var code = codes[j];
      var span_num = $('<span/>').html(j);
      var div_code = $('<div/>').html(code + "<br>");
      $(line_num).append($(span_num));
      $(pre).append($(div_code));
    }
    $(tr_ele).append($(line_num));
    $(line_code).append($(pre));
    $(tr_ele).append($(line_code));
    $(tbody).append($(tr_ele));
    $(table).append($(tbody));
    $(div).append($(table));
    $(code_block).parent().replaceWith(div);
  });

  $($('.article-show img')).each(function (i) {
    if ($(this).hasClass('face'))
      return;
    var a = $('<a class="fancybox"></a>');
    $(a).attr('rel', 'group');
    $(a).attr('id', 'img' + i);
    $(a).attr('href', $(this).attr('src'));
    $(a).attr('title', $(this).attr('title'));
    $(this).removeAttr('title');
    $(this).removeAttr('alt');
    $(this).wrap(a);
  });

  $('.fancybox').fancybox({ // comment this line to disable fancybox
  });
});