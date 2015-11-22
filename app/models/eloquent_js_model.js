'use strict';

var EloquentJs = Object.create({window: this});
EloquentJs.models = [];

EloquentJs.Model = function(name, body){
  eval.call(EloquentJs.window, 'function name(){};'.replace(/\bname\b/, name));

  EloquentJs.models.push(eval(name));

  return EloquentJs;
}

module.exports = EloquentJs;