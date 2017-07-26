var  connection = require('../../config/database');
var  uid = require('../utils/uuid');//用于生成id
var common=require('../utils/common');
//hash算法加盐
var bcrypt = require('bcrypt');//crypto
var SALT_WORK_FACTOR = 10;

function  User(user) {
    this.name = user.name;
    this.password = user.password;
}
var tableName = "user";
mysql = connection.getDbCon();
module.exports = User;
//新增用户
User.prototype.save = function  save(callback) {
    // 用户对象
    var  user = {
        name: this.name,
        password: this.password
    };
    //uuid = uid.v4();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      console.log(hash);
      user.password = hash;
      //next()
      //插入数据库
    var sql ="insert into user (name,password,createAt) values(?,?,?)";
    mysql.query(sql,[user.name,user.password,common.todayDayTime],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err,results,fields);
        }
    });
    });
  })
    
};
//获取用户
User.get =  function  get(username, callback) {
        // 读取 users 集合
        var sql;
        if(username) sql = "select * from user c where c.name='"+username.name+"'";
        else sql = "select * from user c";
        mysql.query(sql,function(err,results,fields){
            if(err){
                throw err;
            }else{   
                if(results.length==0){
                    results=null;
                }else if(results.length==1){
                    results=results[0];
                }
                callback(err,results,fields);
            }
        });
};
//验证密码是否正确
User.comparePassword =  function  comparePassword(_password,_passwordBW ,callback) {
    bcrypt.compare(_password, _passwordBW, function(err, isMatch) {
        console.log('ismatch:'+isMatch);
      if (err) return callback(err)

      callback(null, isMatch)
    })

};