const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify-es').default;

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ff >= 30',
    'chrome >= 34',
    'opera >= 23'
];

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./css/styles.css')
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('./build/css'))
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
  return gulp.src('./scripts/scripts.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('./build/scripts'))
});

// Gulp task to minify HTML files
gulp.task('pages', function() {
  return gulp.src(['./index.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./build'));
});

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
  runSequence(
    'styles',
    'scripts',
    'pages'
  );
});