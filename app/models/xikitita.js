'use strict';

var Xikitita = Object.create({
  window: this,
  id: function(id){
    __id__ = id;

    Object.defineProperty(self, '__idValue__', {
      get: function(){ return self[__id__]; }
    });
  },
  attrAccessible: function(){
    var attrNames = Array.prototype.slice.call(arguments);
    if(__attrAccessible__.length === 0){
      attrNames.unshift(__id__);
    }

    attrNames.forEach(function(attrName){
      self[attrName] = null;
      __attrAccessible__.push(attrName);
    });
  },
  belongsTo: function(model, options){
    var options = options || {};
    var foreingKey = options.foreingKey || model + '_id';
    var primaryKey = options.primaryKey || 'id';

    Object.defineProperty(self, model, {
      get: function(){
        self[model] = belongsToModels[model] || null;
        return belongsToModels[model];
      },
      set: function(value){
        var modelTitleize = model.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
        var Model = eval( modelTitleize );

        if (value !== null && value.constructor.name === 'Object'){
          value = new Model(value);
        }
        belongsToModels[model] = value;

        var idValue = null;
        if (value !== null){
          idValue = value[primaryKey];
        }

        self[foreingKey] = idValue;
      }
    });

    attrAccessible(foreingKey);
    
    __afterNew__.push(function(){
      var object = {};
      object[primaryKey] = self[foreingKey];
      belongsToModels[model] = object;
    });
  },
  hasMany: function(models, options){
    var options = options || {};
    var foreingKey = options.foreingKey || __model__.name.toLowerCase() + '_id';

    Object.defineProperty(self, models, {
      get: function(){
        self[models] = hasManyModels[models];
        return hasManyModels[models];
      },
      set: function(value){
        var modelTitleize = models.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
        var Model = eval( modelTitleize );

        if (value !== null){
          value[foreingKey] = self[__id__];
          if (value.constructor.name === 'Object'){
            value = new Model(value);
          }
        }

        hasManyModels[models] = hasManyModels[models] || [];
        hasManyModels[models] << value;
      }
    });
  },
  hasOne: function(model, options){
    var options = options || {};
    var foreingKey = options.foreingKey || __model__.name.toLowerCase() + '_id';

    Object.defineProperty(self, model, {
      get: function(){
        self[model] = hasOneModels[model] || null;
        return hasOneModels[model];
      },
      set: function(value){
        var modelTitleize = model.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
        var Model = eval( modelTitleize );

        if (value !== null){
          value[foreingKey] = self[__id__];
          if (value.constructor.name === 'Object'){
            value = new Model(value);
          }
        }

        hasOneModels[model] = value;
      }
    });
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

    __afterNew__.forEach(function(callback){
      callback();
    })
  },
  inflection: {
    singular: {},
    plural: {}
  }
});

Xikitita.Model = function(name, body){
  
  eval.call(Xikitita.window, "function #{name}(){\n\
      var __model__ =  #{model};\n\
      var __attrAccessible__ = [];\n\
      \n\
      var self = this;\n\
      var attrAccessible = #{attrAccessible};\n\
      \n\
      var __id__ = 'id';\n\
      var id = #{id};\n\
      var __afterNew__ = [];\n\
      \n\
      var belongsToModels = {};\n\
      var belongsTo = #{belongsTo};\n\
      \n\
      var hasOneModels = {};\n\
      var hasOne = #{hasOne};\n\
      \n\
      var hasManyModels = {};\n\
      var hasMany = #{hasMany};\n\
      \n\
      (#{body})(this);\n\
      attrAccessible();\n\
      \n\
      var __initAttributes__ =  Array.prototype.slice.call(arguments).shift() || {};\n\
      (#{new})(this);\n\
    };"
    .replace(/#{name}/, name)
    .replace(/#{model}/, name)
    .replace(/#{attrAccessible}/, Xikitita.attrAccessible.toString())
    .replace(/#{id}/, Xikitita.id.toString())
    .replace(/#{belongsTo}/, Xikitita.belongsTo.toString())
    .replace(/#{hasOne}/, Xikitita.hasOne.toString())
    .replace(/#{hasMany}/, Xikitita.hasMany.toString())
    .replace(/#{new}/, Xikitita.new.toString())
    .replace(/#{body}/, body.toString())
  );
  var Model = eval(name);

  Object.defineProperties(Model.prototype, {
    "toJson": { get: function () { return JSON.stringify(this); } },
    "asJson": { get: function () { return JSON.parse(this.toJson); } }
  });

  new Model();

  this.models[name] = Model;
  return this;
}

Xikitita.Inflection = function(body){
  var irregular = function(singular, plural){
    Xikitita.inflection.singular[singular] = plural; 
    Xikitita.inflection.plural[plural] = singular;
  }
}


Object.defineProperty(String.prototype, 'pluralize', {
  get: function(){
    var regex = this;
    var replace = Xikitita.inflection.plural[this] || null;

    if(!replace){
      regex = /$/;
      replace = 's';
    }

    return this.replace(regex, replace);
  }
});

Object.defineProperty(String.prototype, 'singularize', {
  get: function(){
    var regex = this;
    var replace = Xikitita.inflection.singular[this] || null;

    if(!replace){
      regex = /s$/;
      replace = '';
    }

    return this.replace(regex, replace);
  }
});

Xikitita.models = Object.create(null);

Object.defineProperty(Xikitita, 'init', {
  get: function(){
    this.models = Object.create(null);
    return this;
  }
});

module.exports = Xikitita;