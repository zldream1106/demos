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
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var px2rem = require('gulp-px3rem');

var SRC_PATHS = {
  templates: './src/templates/**/*.jade',
  scripts: './src/js/**/*.js',
  style: './src/css/**/*.scss',
  css: './src/css/**/*.css',
  images: ['./src/img/**/*.jpg', './src/img/**/*.png']
};
var SRC_PATH = './src/';

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
  return gulp.src(SRC_PATHS.style)
      .pipe(sass({
        // outputStyle: 'compressed'
      }))
    .pipe(gulp.dest(SRC_PATH + '/css'));
});


gulp.task('css', ['sass'], function () {
  return gulp.src(SRC_PATHS.css , {base: './src'})
    .pipe(px2rem({
      threeVersion: false,
      remUnit: 75,
      baseDpr: 2,
      forcePxComment: 'px',
      keepComment: 'no'
    }))
    // px3rem 默认输出的文件带有 .debug 后缀
    .pipe(rename(function (path) {
      path.basename = path.basename.replace('.debug', '');
    }))
    .pipe(postcss([
      // 自动添加厂商前缀
      autoprefixer({
        browsers: ['> 1%', 'last 2 versions']
      })
    ]))
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
/* gulp.task('images', ['clean'], function() {
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
gulp.task('build', ['cleanbuild', 'css', 'scripts', 'templates']);

gulp.task('demos', ['cleandemos', 'htmlone']);

// Rerun the task when a file changes
gulp.task('watch', ['build'], function () {
  gulp.watch([SRC_PATHS.style], ['css']);
  gulp.watch([SRC_PATHS.scripts], ['scripts']);
  gulp.watch([SRC_PATHS.templates], ['templates']);
});

gulp.task('default', ['watch']);
