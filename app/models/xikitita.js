'use strict';

var Xikitita = Object.create({
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
        if (value !== null && value.constructor.name === 'Object'){
          var modelTitleize = model.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
          var Model = eval( modelTitleize );
          value = new Model(value);
        }
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

Xikitita.models = Object.create(null);

Xikitita.Model = function(name, body){
  
  eval.call(Xikitita.window, "function #{name}(){\n\
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
    .replace(/#{attrAccessible}/, Xikitita.attrAccessible.toString())
    .replace(/#{belongsTo}/, Xikitita.belongsTo.toString())
    .replace(/#{hasMany}/, Xikitita.hasMany.toString())
    .replace(/#{hasOne}/, Xikitita.hasOne.toString())
    .replace(/#{new}/, Xikitita.new.toString())
    .replace(/#{body}/, body.toString())
  );
  var Model = eval(name);

  Object.defineProperties(Model.prototype, {
    "toJson": { get: function () { return JSON.stringify(this); } },
    "asJson": { get: function () { return JSON.parse(this.toJson); } }
  });


  Xikitita.models[name] = Model;
  return Xikitita;
}

module.exports = Xikitita;