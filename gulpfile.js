var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('default', function() {
  gulp.src(['app/models/xikitita.js'])
    .pipe(minify())
    .pipe(gulp.dest(''));
});