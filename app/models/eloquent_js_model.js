'use strict';

var EloquentJs = Object.create({
  window: this,
  attrAccessible: function(){
    var attrNames = Array.prototype.slice.call(arguments);

    attrNames.forEach(function(attrName){
      self[attrName] = null;
      __attrAccessible__.push(attrName);
    });
  },
  belongsTo: function(){
    var model = arguments[0];
    
    Object.defineProperty(self, model, {
      enumerable: true,
      get: function(){
        return belongsToModels[model];
      },
      set: function(value){
        belongsToModels[model] = value; 
      }
    });

    attrAccessible(model);
    return model;
  },
  hasMany: function(){
    var hasMany = belongsTo(arguments[0]);
    self[hasMany] = [];
  },
  hasOne: function(){
    belongsTo(arguments[0]);
  },
  new: function(){
    if(typeof __initAttributes__ === 'string'){
      __initAttributes__ = JSON.parse(__initAttributes__);
    }
    
    Object.keys(__initAttributes__).forEach(function(attrName){
      if(__attrAccessible__.indexOf(attrName) < 0){
        throw new TypeError(__model__.name.toLowerCase() + '.' + attrName + ' is not a attribute');
      }
      self[attrName] = __initAttributes__[attrName];
    });
  }
});

EloquentJs.models = [];

EloquentJs.Model = function(name, body){
  
  eval.call(EloquentJs.window, "function #{name}(){\n\
      var __model__ =  #{model};\n\
      var __attrAccessible__ = [];\n\
      \n\
      var self = this;\n\
      var attrAccessible = #{attrAccessible};\n\
      \n\
      var belongsToModels = {};\n\
      var belongsTo = #{belongsTo};\n\
      \n\
      var hasMany = #{hasMany};\n\
      var hasOne = #{hasOne};\n\
      \n\
      (#{body})(this);\n\
      \n\
      var __initAttributes__ =  Array.prototype.slice.call(arguments).shift() || {};\n\
      (#{new})(this);\
    };"
    .replace(/#{name}/, name)
    .replace(/#{model}/, name)
    .replace(/#{attrAccessible}/, EloquentJs.attrAccessible.toString())
    .replace(/#{belongsTo}/, EloquentJs.belongsTo.toString())
    .replace(/#{hasMany}/, EloquentJs.hasMany.toString())
    .replace(/#{hasOne}/, EloquentJs.hasOne.toString())
    .replace(/#{new}/, EloquentJs.new.toString())
    .replace(/#{body}/, body.toString())
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