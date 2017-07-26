var  connection = require('../../config/database');
var  uid = require('../utils/uuid');//用于生成id
var common=require('../utils/common');
function  Comment(comment) {
    this._id=comment._id;
    this.movieId = comment.movieId;//外键
    this.fromUserId=comment.fromUserId,
    this.content = comment.content;
    this.createAt = comment.createAt;
    this.updateAt = comment.updateAt;
}
var tableName = "comment";
mysql = connection.getDbCon();
module.exports = Comment;
//获取评论
Comment.findById =  function  findById(id,callback) {
    console.log(id);
        // 读取 comments 集合
        var comments=[];
        mysql.query('call pro_searAllComment("'+id+'")',function(err,results,fields){
            if(err){
                throw err;
            }else{
                var resultSet=results[0];
                var _commentId;
                var _Obj={};
                var _replyArray=[];
                 
                //返回的是数组格式
                for(var i=0;i<resultSet.length;i++){
                   var commentObj=resultSet[i];
                   if(_commentId==commentObj._id){//评论下有回复
                    var _reply={
                        "from":{
                            "_id":commentObj.fromUserId,
                            "name":commentObj.fromUserName
                        },
                        "to":{
                            "_id":commentObj.replyUserId,
                            "name":commentObj.replyUserName
                        },
                        "content":commentObj.content
                    }
                    _replyArray.push(_reply);
                   }else{//新的一条评论
                    if(_replyArray.length>0){
                        _Obj.reply=_replyArray;
                    }
                        _Obj={
                        "_id":commentObj._id,
                        "from":{
                        "_id":commentObj.fromUserId,
                        "name":commentObj.fromUserName
                        },
                        "content":commentObj.content,
                        "reply":[]
                        }
                        comments.push(_Obj);
                    _replyArray=[];//回复数组重新置空

                   }
                   if(i==resultSet.length-1 && _replyArray.length>0){//最后一条记录
                        _Obj.reply=_replyArray;
                    }
                   _commentId=commentObj._id

                }
                console.log(comments);
                callback(err,comments,fields);
            }
        });
};
//保存评论信息
Comment.prototype.save =  function  save(callback) {
    // 用户对象
    var  _comment = {
        _id:this._id,
        movieId: this.movieId,
        fromUserId:this.fromUserId,
        content: this.content,
        createAt: this.createAt,
        updateAt: this.updateAt
    };
    var sql;
    sql="insert into comment(movieId,content,createAt,fromUserId) values('"+_comment.movieId+"','"+_comment.content+"','"+common.todayDayTime+"',"+_comment.fromUserId+")";
    console.log(sql)
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            //返回用户id
            return callback(err, _comment, fields);
        }
    });
};
//删除电影
Comment.remove =  function  remove(id,callback) {
        // 读取 users 集合
        var sql = "delete from comment where _id='"+id+"'";
        console.log(sql);
        mysql.query(sql,function(err,results,fields){
            if(err){
                throw err;
            }else{
                //返回的是数组格式
                callback(err,results[0],fields);
            }
        });
};


