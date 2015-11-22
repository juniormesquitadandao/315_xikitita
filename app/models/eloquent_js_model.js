'use strict';

var EloquentJs = Object.create({
  window: this,
  attrAccessible: function(){
    
    var __attrAccessible = Array.prototype.slice.call(arguments) || [];
    __attrAccessible.forEach(function(_attrAccessible){
      self[_attrAccessible] = null;
    });

  }
});

EloquentJs.models = [];

EloquentJs.Model = function(name, body){
  
  eval.call(EloquentJs.window, "function __name__(){\
      var self = this;\
      var attrAccessible = __attrAccessible__;\
      (__body__)(this);\
    };"
    .replace(/\b__name__\b/, name)
    .replace(/\b__attrAccessible__\b/, EloquentJs.attrAccessible.toString())
    .replace(/\b__body__\b/, body.toString())
  );
  var Model = eval(name);

  Object.defineProperties(Model.prototype, {
    "toJson": { get: function () { return JSON.stringify(this); } }
  });


  EloquentJs.models.push(Model);
  return EloquentJs;
}

module.exports = EloquentJs;