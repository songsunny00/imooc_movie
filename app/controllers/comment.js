
var Comment = require('../models/comment')
var Reply = require('../models/reply')
// comment
exports.save = function(req, res) {
  var _comment = req.body.comment
  var movieId = _comment.movieId

  if (_comment.cid) {
    Comment.findById(_comment.cid, function(err, comment) {
      var _reply = {
        commentId:_comment.cid,
        fromUserId: _comment.fromUserId,
        fromUserName: _comment.fromUserName,
        replyUserId:_comment.replyUserId,
        replyUserName:_comment.replyUserName,
        content: _comment.content
      }
      var reply=new Reply(_reply)
      console.log(reply);
      reply.save(function(err, comment) {
        if (err) {
          console.log(err)
        }
        res.redirect('/movie/' + movieId)
      })
    })
  }
  else {
    console.log(_comment);
    var comment = new Comment(_comment)

    comment.save(function(err, comment) {
      if (err) {
        console.log(err)
      }
      res.redirect('/movie/' + movieId)
    })
  }
}