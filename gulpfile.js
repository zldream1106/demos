var gulp = require('gulp');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var htmlone = require('gulp-htmlone');
var babel = require('gulp-babel');
var webpack = require('gulp-webpack');

var SRC_PATHS = {
  templates: './src/templates/**/*.jade',
  scripts: './src/js/**/*.js',
  style: './src/css/**/*.scss',
  images: ['./src/img/**/*.jpg', './src/img/**/*.png']
};

var DEST_PATHS = './build';
var DEMO_PATH = './demos';

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm 
gulp.task('cleandemos', function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  del(DEMO_PATH);
});

gulp.task('cleanbuild', function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  del(DEST_PATHS);
});

gulp.task('templates', function () {
  return gulp.src(SRC_PATHS.templates, {base: './src'})
    // .pipe(sourcemaps.init())
      .pipe(gulpJade({
        jade: jade,
        pretty: true
      }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_PATHS));
});

gulp.task('sass', function () {
  return gulp.src(SRC_PATHS.style, {base: './src'})
      .pipe(sass({
        // outputStyle: 'compressed'
      }))
    .pipe(gulp.dest(DEST_PATHS));
});

gulp.task('scripts', function() {
  return gulp.src(SRC_PATHS.scripts, {base: './src'})
    .pipe(sourcemaps.init())
      // .pipe(uglify())
    .pipe(babel({
      presets: ['es2015'] // ,
      // plugins: ['transform-runtime']
    }))
    // .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_PATHS));
});

// Copy all static images
/*
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});
*/

// Combine html
gulp.task('htmlone', ['cleandemos'], function () {
  return gulp.src(DEST_PATHS + '/templates/*.html')
  .pipe(htmlone({
    jsminify: false,
    cssminify: false
  }))
  .pipe(gulp.dest(DEMO_PATH));
});


// The default task (called when you run `gulp` from cli) 
gulp.task('build', ['cleanbuild', 'sass', 'scripts', 'templates']);

gulp.task('demos', ['cleandemos', 'htmlone']);

// Rerun the task when a file changes 
gulp.task('watch', ['sass', 'scripts', 'templates']);

gulp.task('default', ['watch']);
