var gulp = require('gulp');
var minify = require('gulp-minify');
var insert = require('gulp-insert');

gulp.task('default', function() {
  
  gulp.src(['app/models/xikitita.js'])
    .pipe(minify())
    .pipe(gulp.dest(''))
  
  gulp.src('xikitita.js')
    .pipe(insert.append('\n\nmodule.exports = Xikitita;'))
    .pipe(gulp.dest('spec/models'))
});