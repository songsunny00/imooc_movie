var  connection = require('../../config/database');
var  uid = require('../utils/uuid');//用于生成id
var common=require('../utils/common');
function  Movie(movie) {
    this._id=movie._id;
    this.title = movie.title;
    this.doctor = movie.doctor;
    this.language = movie.language;
    this.country = movie.country;
    this.summary = movie.summary;
    this.flash = movie.flash;
    this.poster = movie.poster;
    this.year = movie.year;
    this.createAt = movie.createAt;
    this.updateAt = movie.updateAt;
}
var tableName = "movie";
mysql = connection.getDbCon();
module.exports = Movie;
//获取电影信息
Movie.fetch =  function  fetch(callback) {

        // 读取 users 集合
        var sql = "select * from movie m";
        mysql.query(sql,function(err,results,fields){
            if(err){
                throw err;
            }else{
                callback(err,results,fields);
            }
        })
};
//获取电影详情
Movie.findById =  function  findById(id,callback) {
        // 读取 users 集合
        var sql = "select * from movie m where m._id='"+id+"'";
        mysql.query(sql,function(err,results,fields){
            if(err){
                throw err;
            }else{
                //返回的是数组格式
                callback(err,results[0]);
            }
        });
};
//保存电影信息
Movie.prototype.save =  function  save(flagStr,callback) {
    // 用户对象
    var  _movie = {
        _id:this._id,
        title: this.title,
        doctor: this.doctor,
        language: this.language,
        country: this.country,
        summary: this.summary,
        flash: this.flash,
        poster: this.poster,
        year: this.year,
        createAt: this.createAt,
        updateAt: this.updateAt
    };
    var sql;
    if(flagStr==='insert'){
        _movie._id = uid.v4();//'201705221600001';
        _movie.createAt=common.todayDayTime;
        console.log(_movie._id);
        sql="insert into movie(_id,title,doctor,language,country,summary,flash,poster,year,createAt) values('"+_movie._id+"','"+_movie.title+"','"+_movie.doctor+"','"+_movie.language+"','"+_movie.country+"','"+_movie.summary+"','"+_movie.flash+"','"+_movie.poster+"','"+_movie.year+"','"+_movie.createAt+"')";;
    }else{
        _movie.updateAt=common.todayDayTime;
        sql="update movie set title='"+_movie.title+"',doctor='"+_movie.doctor+"',language='"+_movie.language+"',country='"+_movie.country+"',summary='"+_movie.summary+"',flash='"+_movie.flash+"',poster='"+_movie.poster+"',year='"+_movie.year+"',updateAt='"+_movie.updateAt+"' where _id='"+_movie._id+"'";
    }
    console.log(sql)
    mysql.query(sql,function(err,results,fields){
        if(err){
            console.log('model err');
            throw err;
        }else{
            //返回用户id
            return callback(err, _movie, fields);
        }
    });
};
//删除电影
Movie.remove =  function  remove(id,callback) {
        // 读取 users 集合
        var sql = "delete from movie where _id='"+id+"'";
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

