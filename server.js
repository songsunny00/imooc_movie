var express=require('express');
var path=require('path');
var port=process.env.PORT || 3000;
var app=express()//实例赋给变量
var session = require('express-session');
//var FileStore = require('session-file-store')(session);
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var serveStatic = require('serve-static');  // 静态文件处理
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');//处理文件上传
var fs = require('fs')

app.set('views','./app/views/pages');
app.set('view engine','jade');

// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(require('connect-multiparty')());
app.use(session({//默认内存储存
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 }
}));
app.use(function(req,res,next){
    res.locals = req.session;
    next();
});

//开发环境打印
var morgan = require('morgan');
var logger = morgan('dev');
if ('development' === app.get('env')) {
  app.set('showStackError', true)
  app.use(morgan(':method :url :status'));
  app.locals.pretty = true
  //mongoose.set('debug', true)
}

require('./config/routes')(app);
app.listen(port);
app.use(serveStatic(__dirname+'/public')); // 路径：public

console.log('server start success!'+port);

