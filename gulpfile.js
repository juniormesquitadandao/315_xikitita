var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var insert = require('gulp-insert');

gulp.task('default', function() {
  
  gulp.src(['app/models/base.js', 'app/models/model.js', 'app/models/xikitita.js'])
    .pipe(concat('xikitita.js'))
    .pipe(insert.prepend('\'use strict\';\n\n'))
    .pipe(minify())
    .pipe(gulp.dest(''))
  

  gulp.src(['app/models/base.js', 'app/models/model.js', 'app/models/xikitita.js'])
    .pipe(concat('xikitita.js'))
    .pipe(insert.prepend('\'use strict\';\n\n'))
    .pipe(insert.append('\n\nmodule.exports = Xikitita;'))
    .pipe(gulp.dest('spec/models'));

});