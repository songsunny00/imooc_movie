var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    csslint = require('gulp-csslint'),
    rev = require('gulp-rev'),
    minifyCss = require('gulp-minify-css'),
    changed = require('gulp-changed'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    revCollector = require('gulp-rev-collector'),
    minifyHtml = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
	//
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	clean = require('gulp-clean'),
	livereload = require('gulp-livereload'),
	//
    del = require('del');

var server = require('gulp-express');

var cssSrc = 'public/css/**/*.less',
    cssDest = 'dist/css',
    jsSrc = 'public/js/**/*.js',
    jsDest = 'dist/js',
    fontSrc = 'public/fonts/*',
    fontDest = 'dist/font',
    imgSrc = 'public/img/*',
    imgDest = 'dist/img',
    cssRevSrc = 'public/css/revCss',
    condition = true;

function changePath(basePath){
    var nowCssSrc = [];
    for (var i = 0; i < cssSrc.length; i++) {
        nowCssSrc.push(cssRevSrc + '/' + cssSrc[i]);
    }
    return nowCssSrc;
}

//Fonts & Images 根据MD5获取版本号
gulp.task('revFont', function(){
    return gulp.src(fontSrc)
        .pipe(rev())
        .pipe(gulp.dest(fontDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/rev/font'));
});
gulp.task('revImg', function(){
    return gulp.src(imgSrc)
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(rev())
        .pipe(gulp.dest(imgDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/rev/img'));
});

//检测JS
gulp.task('lintJs', function(){
    return gulp.src(jsSrc)
        //.pipe(jscs())   //检测JS风格
        .pipe(jshint({
            "undef": false,
            "unused": false
        }))
        //.pipe(jshint.reporter('default'))  //错误默认提示
        .pipe(jshint.reporter(stylish))   //高亮提示
        .pipe(jshint.reporter('fail'));
});

//压缩JS/生成版本号
gulp.task('miniJs', function(){
    return gulp.src(jsSrc)
        .pipe(gulpif(
            condition, uglify()
        ))
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/rev/js'));
});

//CSS里更新引入文件版本号
gulp.task('revCollectorCss', function () {
    return gulp.src(['public/rev/**/*.json', 'public/css/*.less'])
        .pipe(revCollector())
        .pipe(gulp.dest(cssRevSrc));
});

//检测CSS
gulp.task('lintCss', function(){
    return gulp.src(cssSrc)
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
});


//压缩/合并CSS/生成版本号
gulp.task('miniCss', function(){
    return gulp.src(changePath(cssRevSrc))
        .pipe(less())
        .pipe(gulpif(
            condition, minifyCss({
                compatibility: 'ie7'
            })
        ))
        .pipe(rev())
        .pipe(gulpif(
                condition, changed(cssDest)
        ))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: false       
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/rev/css'));
});

//压缩Html/更新引入文件版本
gulp.task('miniHtml', function () {
    return gulp.src(['public/rev/**/*.json', 'public/*.html'])
        .pipe(revCollector())
        .pipe(gulpif(
            condition, minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            })
        ))
        .pipe(gulp.dest('dist'));
});

gulp.task('delRevCss', function(){
    del([cssRevSrc,cssRevSrc.replace('public/', 'dist/')]);    
});

/*//意外出错？清除缓存文件
gulp.task('clean', function(){
    del([cssRevSrc ,cssRevSrc.replace('src/', 'dist/')]);
});*/
// 清理
gulp.task('clean', function() {  
  return gulp.src(['dist/css', 'dist/js', 'dist/img','dist/font'], {read: false})
    .pipe(clean());
});
// 看手
gulp.task('watch', function() {

  // 看守所有.scss档
  gulp.watch('public/css/**/*.less', ['build']);

  // 看守所有.js档
  gulp.watch('public/js/**/*.js', ['build']);

  // 看守所有图片档
  gulp.watch('public/img/**/*', ['build']);

  // 建立即时重整伺服器
  var server2 = livereload();

  // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  gulp.watch(['dist/**']).on('change', function(file) {
    //server.changed(file.path);
  });

});


//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
         ['revFont', 'revImg'],
         ['lintJs'],
         ['revCollectorCss'],
         ['miniCss', 'miniJs'],
         ['miniHtml', 'delRevCss'],
    done);
});

//正式构建
gulp.task('build', function (done) {
    server.run(['server.js']);
    runSequence(
         ['revFont', 'revImg'],
         //['lintJs'],
         ['revCollectorCss'],
         ['miniCss', 'miniJs'],
         ['miniHtml', 'delRevCss'],
    done);
});


gulp.task('default', ['build']);
