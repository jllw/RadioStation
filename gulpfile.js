var gulp = require('gulp');
var jshint = require("gulp-jshint");
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var inlinesource = require('gulp-inline-source');
var connect = require('gulp-connect');
var clean = require('del');
var useref = require('gulp-useref');
var sequence = require('gulp-sequence');



//js代码校验  有问题
gulp.task('jshint', function() {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
})

//压缩js文件
gulp.task('minify-js', function() {
    gulp.src('src/js/*js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//压缩css文件
gulp.task('minify-css', function() {
    gulp.src('src/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

//合并js文件 有问题
gulp.task('concatJs', function() {
    gulp.src('src/js/*song.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));

});

//合并css文件
gulp.task('concatCss', function() {
    gulp.src('src/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css'));
});




//图片压缩
gulp.task('pic', function() {
    return gulp.src('src/pic/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/pic'));
});

//合拼图片（雪碧图）
gulp.task('sprite', function() {
    return gulp.src('src/pic/*song.png')
        .pipe(spritesmith({
            imgName: 'pic/sprite.png',
            cssName: 'css/sprite.css',
            padding: 2,
            algorithm: 'binary-tree',

        })).pipe(gulp.dest('dist/'));
});

//资源嵌入，内联css，js
gulp.task('inlinesource', function() {
    return gulp.src('src/*.html')
        .pipe(inlinesource())
        .pipe(useref())
        .pipe(gulp.dest('dist/'));
});

//删除dist文件
gulp.task('clean', function(cb) {
    clean(['dist']).then(function() {
        cb()
        gulp.src('src/mp3/**').pipe(gulp.dest('dist/mp3')); //将mp3文件从src复制到dis文件夹
    });

});

gulp.task('watchlist', function(cb) {
    sequence('clean', ['jshint', 'minify-js', 'minify-css', 'concatJs', 'concatCss', 'pic', 'sprite' ],'inlinesource')(cb)
});

//watch src文件夹
gulp.task('watch', function() {
    gulp.watch(['src/**'], ['watchlist']);
})

//服务器
gulp.task('connect', function() {
    connect.server({
        root: 'dist/',
        port: 8080,
        livereload: true
    });
});


gulp.task('default', function(cb) {
    sequence('clean', ['jshint', 'minify-js', 'minify-css', 'concatJs', 'concatCss', 'pic', 'sprite', 'connect'], 'inlinesource', 'watch')(cb)
});