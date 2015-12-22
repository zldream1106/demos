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

var SRC_PATHS = {
  templates: './src/templates/*.jade',
  scripts: ['./src/js/*.js'],
  style: './src/css/*.scss',
  images: './src/img/**/*'
}
var DEST_PATHS = {
  html: './demos/html',
  js: './demos/js',
  css: './demos/css'
}

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm 
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  del(['demos'], cb);
});
 
gulp.task('templates', function () {
  return gulp.src(SRC_PATHS.templates)
    // .pipe(sourcemaps.init())
      .pipe(gulpJade({
        jade: jade,
        pretty: true
      }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_PATHS.html));
});

gulp.task('sass', function () {
  return gulp.src(SRC_PATHS.style)
      .pipe(sass({
        // outputStyle: 'compressed'
      }))
    .pipe(gulp.dest(DEST_PATHS.css));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(SRC_PATHS.scripts)
    .pipe(sourcemaps.init())
      // .pipe(uglify())
    .pipe(babel({
      presets: ['es2015'] // ,
      // plugins: ['transform-runtime']
    }))
    // .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_PATHS.js));
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
gulp.task('htmlone', function() {
  return gulp.src(['./*.html'])
  .pipe(htmlone({
    jsminify: false,
    cssminify: false
  }))
  .pipe(gulp.dest('demos/'));
});


// Rerun the task when a file changes 
gulp.task('default', ['watch']);

// The default task (called when you run `gulp` from cli) 
gulp.task('watch', ['clean', 'sass', 'scripts', 'templates']);
