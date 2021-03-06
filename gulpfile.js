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

  gulp
    .src(src)
    .pipe(concat('xktta.js'))

    .pipe(insert.prepend("'use strict';\n\n"))
    .pipe(insert.prepend(";(function(window){\n"))
    .pipe(insert.prepend(" */\n"))
    .pipe(insert.prepend(" * Copyright (c) 2015 Marcelo Junior\n"))
    .pipe(insert.prepend(" *\n"))
    .pipe(insert.prepend(" * http://juniormesquitadandao.github.io/xktta\n"))
    .pipe(insert.prepend("/*! Xktta - v1.0\n"))

    .pipe(insert.append('\nwindow.Xktta = Xktta;\n'))
    .pipe(insert.append("})(window);\n"))

    .pipe(minify({
        ext:{
          src:'.js',
          min:'.min.js'
        }
    }))
    .pipe(gulp.dest(''));

  gulp
    .src(src)
    .pipe(concat('xktta.js'))

    .pipe(insert.prepend("'use strict';\n\n"))
    .pipe(insert.prepend(";(function(){\n"))

    .pipe(insert.append('\nmodule.exports = Xktta;\n'))
    .pipe(insert.append("})();\n"))

    .pipe(gulp.dest('temp'));

});