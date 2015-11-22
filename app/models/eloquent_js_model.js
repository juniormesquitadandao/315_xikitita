'use strict';

var EloquentJs = Object.create({
  window: this,
  attrAccessible: function(){
    __attrAccessible = Array.prototype.slice.call(arguments);
    __attrAccessible.forEach(function(_attrAccessible){
      self[_attrAccessible] = null;
    });
  },
  belongsTo: function(){
    var __belongsTo = arguments[0];
    attrAccessible(__belongsTo);
    return __belongsTo;
  },
  hasMany: function(){
    var __hasMany = belongsTo(arguments[0]);
    self[__hasMany] = [];
  },
  hasOne: function(){
    belongsTo(arguments[0]);
  },
  new: function(){
    if(typeof __initAttributes === 'string'){
      __initAttributes = JSON.parse(__initAttributes);
    }
    
    Object.keys(__initAttributes).forEach(function(attrName){
      if(__attrAccessible.indexOf(attrName) < 0){
        throw new TypeError(__model.name.toLowerCase() + '.' + attrName + ' is not a attribute');
      }
      self[attrName] = __initAttributes[attrName];
    });
  }
});

EloquentJs.models = [];

EloquentJs.Model = function(name, body){
  
  eval.call(EloquentJs.window, "function __name__(){\n\
      var __model = __model__;\n\
      var __attrAccessible = [];\n\
      \n\
      var self = this;\n\
      var attrAccessible = __attrAccessible__;\n\
      var belongsTo = __belongsTo__;\n\
      var hasMany = __hasMany__;\n\
      var hasOne = __hasOne__;\n\
      (__body__)(this);\n\
      var __initAttributes =  Array.prototype.slice.call(arguments).shift() || {};\n\
      (__new__)(this);\
    };"
    .replace(/\b__name__\b/, name)
    .replace(/\b__model__\b/, name)
    .replace(/\b__attrAccessible__\b/, EloquentJs.attrAccessible.toString())
    .replace(/\b__belongsTo__\b/, EloquentJs.belongsTo.toString())
    .replace(/\b__hasMany__\b/, EloquentJs.hasMany.toString())
    .replace(/\b__hasOne__\b/, EloquentJs.hasOne.toString())
    .replace(/\b__body__\b/, body.toString())
    .replace(/\b__new__\b/, EloquentJs.new.toString())
  );
  var Model = eval(name);

  Object.defineProperties(Model.prototype, {
    "toJson": { get: function () { return JSON.stringify(this); } }
  });


  EloquentJs.models = EloquentJs.models.filter(function(model){ return  model.name !== Model.name;});
  EloquentJs.models.push(Model);
  return EloquentJs;
}

module.exports = EloquentJs;