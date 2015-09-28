var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var jscs = require('gulp-jscs');
var gulpNpmTest = require('gulp-npm-test');

var path = {
  HTML: 'client/src/dashboard.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'client/dist',
  DEST_BUILD: 'client/dist/build',
  DEST_SRC: 'client/dist/src',
  ENTRY_POINT: './client/src/js/app.jsx',
};

//this task auto-fixes according to the code style defined in .jscs file found inside the root folder.
gulp.task('jscs', function() {
  return gulp.src('*/*.js') //test all JS files
    .pipe(jscs({fix:true}))           //fixes the style errors found
    .pipe(jscs.reporter())            //report on the progress of the task
    .pipe(jscs.reporter('fail'))
    .pipe(gulp.dest('server'));
});

//this runs 'npm test'
gulp.task('test', function() {
  gulpNpmTest(require('gulp'));
});

gulp.task('copy', function() {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch',   function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true,
  }));

  return watcher.on('update', function() {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
    console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function() {
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function() {
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT,
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('commit', ['jscs', 'build', 'test']);

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch']);
