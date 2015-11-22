'use strict';

var EloquentJs = Object.create({window: this});
EloquentJs.models = [];

EloquentJs.Model = function(name, body){
  eval.call(EloquentJs.window, 'function name(){};'.replace(/\bname\b/, name));
  var model = eval(name);

  Object.defineProperties(model.prototype, {
    "toJson": { get: function () { return '{}'; } }
  });


  EloquentJs.models.push(model);
  return EloquentJs;
}

module.exports = EloquentJs;