var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    coffee = require('gulp-coffee'),
    slim = require('gulp-slim'),
    del = require('del');

gulp.task('scss', function() {
  gulp.src('src/stylesheets/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('coffee', function() {
  gulp.src('./src/javascripts/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('slim', function () {
  gulp.src('./src/views/*.slim')
  	.pipe(slim({pretty: true, options: "encoding='utf-8'"}))
  	.pipe(gulp.dest('dist/'))
  	.pipe(notify({ message: '赵云鹏是SB!!Slim task complete' }));
})

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

gulp.task('watch', function() {

	livereload.listen();
	gulp.watch(['dist/**']).on('change', livereload.changed);

	// Watch .scss files
	gulp.watch('src/stylesheets/*.scss', ['scss']);

	// Watch .coffee files
	gulp.watch('src/javascripts/*.coffee', ['coffee']);

	// Watch .slim files
	gulp.watch('src/views/*.slim', ['slim']);

});