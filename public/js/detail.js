$(function() {
  $('.comment').click(function(e) {
    var target = $(this)
    var toId = target.data('tid');
    var toName=target.data('tname');
    var commentId = target.data('cid')

    if ($('#replyUserId').length > 0) {
      $('#replyUserId').val(toId);
      $('#replyUserName').val(toName);
    }
    else {
      $('<input>').attr({
        type: 'hidden',
        id: 'replyUserId',
        name: 'comment[replyUserId]',
        value: toId
      }).prependTo('#commentForm');
      $('<input>').attr({
        type: 'text',
        id: 'replyUserName',
        name: 'comment[replyUserName]',
        value: toName
      }).prependTo('#commentForm');
      $('#commentForm').prepend('<span>回复：</span>')
    }

    if ($('#commentId').length > 0) {
      $('#commentId').val(commentId)
    }
    else {
      $('<input>').attr({
        type: 'hidden',
        id: 'commentId',
        name: 'comment[cid]',
        value: commentId
      }).appendTo('#commentForm')
    }
  })
})