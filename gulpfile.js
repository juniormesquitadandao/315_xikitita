var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var insert = require('gulp-insert');

gulp.task('default', function() {
  
  var src = [
    'app/models/base.js', 
    'app/models/inflection.js', 
    'app/models/i18n.js', 
    'app/models/error.js', 
    'app/models/class.js', 
    'app/models/association.js', 
    'app/models/validation.js', 
    'app/models/validator.js', 
    'app/models/patch_object.js', 
    'app/models/patch_string.js',
    'app/models/patch_date.js',
    'app/models/patch_number.js',
    'app/models/patch_boolean.js'
  ]

  gulp.src(src)
    .pipe(concat('xikitita.js'))

    .pipe(insert.prepend("'use strict';\n\n"))
    .pipe(insert.prepend(";(function(window){\n"))
    .pipe(insert.prepend(" */\n"))
    .pipe(insert.prepend(" * Copyright (c) 2016 Marcelo Junior\n"))
    .pipe(insert.prepend(" *\n"))
    .pipe(insert.prepend(" * http://juniormesquitadandao.github.io/315_xikitita\n"))
    .pipe(insert.prepend("/*! 315 Xikitita - v1.0 - 2016-04-01\n"))

    .pipe(insert.append('module.exports = Xikitita;'))
    .pipe(insert.append("\n})(window);"))

    .pipe(minify())
    .pipe(gulp.dest(''));

  gulp.src(src)
    .pipe(concat('xikitita.js'))

    .pipe(insert.prepend("'use strict';\n\n"))
    .pipe(insert.prepend(";(function(){\n"))

    .pipe(insert.append('module.exports = Xikitita;'))
    .pipe(insert.append("\n})();\n"))

    .pipe(gulp.dest('temp'));

});