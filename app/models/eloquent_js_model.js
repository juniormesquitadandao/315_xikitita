'use strict';

var EloquentJs = Object.create({
  window: this,
  attrAccessible: function(){
    console.log(Array.prototype.slice.call(arguments).shift());
  }
});

EloquentJs.models = [];

EloquentJs.Model = function(name, body){
  
  eval.call(EloquentJs.window, "function __name__(){\
      var attrAccessible = __attrAccessible__;\
      (__body__)(this);\
    };"
    .replace(/\b__name__\b/, name)
    .replace(/\b__attrAccessible__\b/, EloquentJs.attrAccessible.toString())
    .replace(/\b__body__\b/, body.toString())
  );
  var model = eval(name);

  Object.defineProperties(model.prototype, {
    "toJson": { get: function () { return '{}'; } }
  });


  EloquentJs.models.push(model);
  return EloquentJs;
}

module.exports = EloquentJs;