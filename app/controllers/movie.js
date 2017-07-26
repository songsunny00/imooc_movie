var Movie = require('../models/movie');
var Comment = require('../models/comment');
var _underscore = require('underscore'); // _.extend用新对象里的字段替换老的字段
// 编写主要页面路由
// index page 首页
exports.index=function(req,res){
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {  // 渲染index 首页
            //session:req.session,
            title: 'i_movie 首页',
            movies: movies
        });
    });
}
// admin page 后台录入页
exports.adminIdx=function (req, res) {
    res.render('admin', {
        title: 'i_movie 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
}
// detail page 详情页
exports.getDetail=function (req, res) {
    var id = req.params.id;
    console.log(id);
    Movie.findById(id, function (err, movie) {
        Comment.findById(id,function (err,comments) {
            res.render('detail', {
                title: '详情页' + movie.title,
                movie: movie,
                comments:comments
            });
        });
        
    });
}
// admin update movie 后台更新页
exports.refresh_BW=function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imovie 后台更新页',
                movie: movie
            });
        });
    }
}
// admin post movie 后台录入提交
exports.editMovie_BW=function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie = null;
    if (id !== 'undefined') { // 已经存在的电影数据
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            //_movie = _underscore.extend(movie, movieObj); // 用新对象里的字段替换老的字段
            _movie = new Movie({
                _id:movieObj._id,
                doctor: movieObj.doctor,
                title: movieObj.title,
                country: movieObj.country,
                language: movieObj.language,
                year: movieObj.year,
                poster: movieObj.poster,
                summary: movieObj.summary,
                flash: movieObj.flash
            });
            _movie.save('update',function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {  // 新加的电影
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        _movie.save('insert',function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
}
// list page 列表页
exports.getList= function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'i_movie 列表页',
            movies: movies
        });
    });
}
// list delete movie data 列表页删除电影
exports.deleMovie_BW= function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove(id, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
}


