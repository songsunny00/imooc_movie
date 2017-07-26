var  connection = require('../../config/database');
var  uid = require('../utils/uuid');//用于生成id
var common=require('../utils/common');
function  Reply(reply) {
    this._id=reply._id;
    this.commentId=reply.commentId;
    this.fromUserName = reply.fromUserName;//外键
    this.fromUserId=reply.fromUserId,
    this.replyUserName = reply.replyUserName;//外键
    this.replyUserId=reply.replyUserId,
    this.content = reply.content;
    this.createAt = reply.createAt;
    this.updateAt = reply.updateAt;
}
var tableName = "reply";
mysql = connection.getDbCon();
module.exports = Reply;
//保存回复信息
Reply.prototype.save =  function  save(callback) {
    // 用户对象
    var r = {
        commentId:this.commentId,
        fromUserId: this.fromUserId,
        fromUserName: this.fromUserName,
        replyUserId:this.replyUserId,
        replyUserName:this.replyUserName,
        content: this.content
    }
    var sql;
    sql="insert into reply(commentId,fromUserId,fromUserName,replyUserId,replyUserName,content,createAt) values(?,?,?,?,?,?,?)";
    console.log(sql)
    mysql.query(sql,[r.commentId,r.fromUserId,r.fromUserName,r.replyUserId,r.replyUserName,r.content,common.todayDayTime],function(err,results,fields){
        if(err){
            throw err;
        }else{
            //返回用户id
            return callback(err,results);
        }
    });
};
