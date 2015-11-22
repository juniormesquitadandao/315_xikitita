'use strict';

var EloquentJs = Object.create({
  window: this,
  attrAccessible: function(){
    var __attrAccessible = Array.prototype.slice.call(arguments);
    __attrAccessible.forEach(function(_attrAccessible){
      self[_attrAccessible] = null;
    });
  },
  belongsTo: function(){
    var __belongsTo = Array.prototype.slice.call(arguments).shift();
    attrAccessible(__belongsTo);
  },
  hasMany: function(){
    var __hasMany = Array.prototype.slice.call(arguments).shift();
    attrAccessible(__hasMany);
    self[__hasMany] = [];
  }
});

EloquentJs.models = [];

EloquentJs.Model = function(name, body){
  
  eval.call(EloquentJs.window, "function __name__(){\
      var self = this;\
      var attrAccessible = __attrAccessible__;\
      var belongsTo = __belongsTo__;\
      var hasMany = __hasMany__;\
      (__body__)(this);\
    };"
    .replace(/\b__name__\b/, name)
    .replace(/\b__attrAccessible__\b/, EloquentJs.attrAccessible.toString())
    .replace(/\b__belongsTo__\b/, EloquentJs.belongsTo.toString())
    .replace(/\b__hasMany__\b/, EloquentJs.hasMany.toString())
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