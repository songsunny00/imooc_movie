
/*
 * GET home page.
 */
//用于生成口令的散列值
//var crypto = require('crypto');
//var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
//var Category = require('../app/controllers/category')
var Comment = require('../app/controllers/comment')

module.exports = function (app) { 
//编写路由
//Movie
app.get('/',Movie.index);// index page 首页
app.get('/admin/movie',Movie.adminIdx);// admin page 后台录入页
app.get('/movie/:id',Movie.getDetail);// detail page 详情页  201705181510001
app.get('/admin/update/:id',Movie.refresh_BW);// admin update movie 后台更新页
app.post('/admin/movie/new',Movie.editMovie_BW);// admin post movie 后台录入提交
app.get('/admin/list',Movie.getList);// list page 列表页
app.delete('/admin/movie/list',Movie.deleMovie_BW);// admin post movie 后台录入提交

  // User
  app.post('/user/signup', User.signup)
  app.post('/user/signin', User.signin)
  app.get('/signin', User.showSignin)
  app.get('/signup', User.showSignup)
  app.get('/logout', User.logout)
  //app.get('/admin/user/list', User.list)
  app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);

  // Comment
  app.post('/user/comment', User.signinRequired, Comment.save)
}
