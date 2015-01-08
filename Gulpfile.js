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

gulp.task('default', function() {
    gulp.run("scss");
    gulp.run("coffee");
    gulp.run("slim");
    gulp.run("watch");
});

gulp.task('scss', function() {
  gulp.src('src/stylesheets/main.scss')
    .pipe(autoprefixer({
            browsers: ['last 2 version', '> 5%']
        }))
    .pipe(sass({ precision: 30, style: 'expanded' }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('coffee', function() {
  gulp.src('./src/javascripts/*.coffee')
    .pipe(coffee({bare: true}).on('error', console.log))
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
  	.pipe(notify({ message: 'Slim task complete' }));
})

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js'], cb)
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