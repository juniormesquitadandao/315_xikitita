'use strict';

Object.defineProperties(String.prototype, {
  capitalize: { 
    get: function(){
      return this.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
    }
  },
  pluralize: { 
    get: function(){
      var irregular = this;
      var regex = irregular;
      var replace = Xikitita.inflection.plural[irregular] || null;

      if(!replace){
        regex = /$/;
        replace = 's';
      }

      return this.replace(regex, replace);
    }
  },
  singularize: { 
    get: function(){
      var irregular = this;
      var regex = irregular;
      var replace = Xikitita.inflection.singular[irregular] || null;

      if(!replace){
        regex = /s$/;
        replace = '';
      }

      return this.replace(regex, replace);
    }
  }
});
Object.defineProperties(Array.prototype, {
  toJson: { 
    get: function () { 
      return JSON.stringify(this); 
    }
  },
  asJson: { 
    get: function () { 
      return JSON.parse(this.toJson); 
    } 
  },
  isAny: { get: function () { 
    return this.length > 0; 
    }
  },
  isEmpty: { 
    get: function () { 
      return !this.isAny;
    }
  }
});

var Xikitita = {window: this};

Object.defineProperty(Xikitita, 'init', {
  get: function(){
    var __this__ = this;

    __this__.models = {};
    __this__.inflection = { singular: {}, plural: {} };
    __this__.translations = {};
    __this__.validators = {};

    eval.call(__this__.window, "var I18n;");
    I18n = {
      locale: 'en',
      translate: function(path, params){
        var translation = path;
        var translations = __this__.translations[I18n.locale];
        path.split('.').forEach(function(key){
          translations = translations[key];
        });

        if(typeof translations  === 'string'){
          translation = translations;
          params = params || {};
          Object.keys(params).forEach(function(param) {
            translation = translation.replace(new RegExp('#{' + param + '}', 'ig'), params[param]);
          });
        }

        return translation;
      },
      localize: function(value, format){
        format = format || 'default';
        var formatted = value;

        if(typeof value === 'object' && value.constructor.name === 'Date'){
          formatted = __this__.translations[I18n.locale].date[format](value);
        }
        else if(typeof value === 'number' ){
          
          var functionFormat = __this__.translations[I18n.locale].integer[format];
          if(/\./.test(value)){
            functionFormat = __this__.translations[I18n.locale].decimal[format];
          }
          formatted = functionFormat(value);

        }
        else if(typeof value === 'boolean' ){
          formatted = __this__.translations[I18n.locale].logic[format](value);
        }

        return formatted;
      }
    }

    I18n.t = I18n.translate
    I18n.l = I18n.localize

    __this__.Validator('presence', 'blank', function(value, attrName, object, options){
      return value !== null;
    });

    return __this__;
  }
});
Xikitita.Inflection = function(body){
  var __this__ = this;

  var irregular = function(singular, plural){
    __this__.inflection.singular[singular] = plural; 
    __this__.inflection.plural[plural] = singular;
  }

  eval("new function (){\n\
      var irregular = #{irregular};\n\
      (#{body})(this);\n\
    };"
    .replace(/#{irregular}/, irregular.toString())
    .replace(/#{body}/, body.toString())
  );

  return __this__;
}

Xikitita.I18n = function(locale, translations){
  this.translations[locale] = translations || {};
  return this;
}
Xikitita.Error = function(modelName){
  var __this__ = this;
  var modelName = modelName;

  Object.defineProperties(__this__, {
    toJson: { 
      get: function () { 
        return JSON.stringify(__this__); 
      } 
    },
    asJson: { 
      get: function () { 
        return JSON.parse(__this__.toJson); 
      } 
    },
    isAny: {
      get: function(){
        return Object.keys(__this__).isAny;
      }
    },
    isEmpty: {
      get: function(){
        return !__this__.isAny;
      }
    },
    add: {
      value: function(attrName, message){
        __this__[attrName] = __this__[attrName] || [];
        __this__[attrName].push(message);
      }
    },
    clear: {
      get: function(){
        for (var attrName in __this__) delete __this__[attrName];
      }
    },
    messages: {
      get: function(){
        var messages = [];

        Object.keys(__this__).forEach(function(attrName){
          
          __this__[attrName].forEach(function(message){
            messages.push(message);
          });

        });

        return messages;
      }
    },
    fullMessages: {
      get: function(){
        var fullMessages = [];

        Object.keys(__this__).forEach(function(attrName){
          var path = ['attributes', modelName, attrName].join('.');
          var attrNameTranslated = I18n.t(path);

          __this__[attrName].forEach(function(message){
            var fullMessage = I18n
              .t('errors.format')
              .replace(/#{attribute}/, attrNameTranslated)
              .replace(/#{message}/, message);

            fullMessages.push(fullMessage);
          });

        });

        return fullMessages;
      }
    }
  });
}

Xikitita.id = function(id){
  __id__ = id;

  Object.defineProperty(self, '__idValue__', {
    get: function(){ return self[__id__]; }
  });
};

Xikitita.attrAccessible = function(){
  var attrNames = Array.prototype.slice.call(arguments);
  if(__attrAccessible__.length === 0){
    attrNames.unshift(__id__);
  }

  attrNames.forEach(function(attrName){
    self[attrName] = null;
    __attrAccessible__.push(attrName);
  });
};

Xikitita.new = function(){
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
};

Xikitita.def = function(name, body){
  Object.defineProperty(self, name, {
    value: body, 
    enumerable: false
  });
};

Xikitita.defSelf = function(name, body){
  __model__[name] = __model__[name] || body;
};

Xikitita.Model = function(name, body){
  
  eval.call(Xikitita.window, "function #{name}(){\n\
      var Xikitita = Xikitita;\n\
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
      var __belongsToModels__ = {};\n\
      var belongsTo = #{belongsTo};\n\
      \n\
      var __hasOneModels__ = {};\n\
      var hasOne = #{hasOne};\n\
      \n\
      var __hasManyModels__ = {};\n\
      var hasMany = #{hasMany};\n\
      \n\
      var __errors__ = new #{Error}(__model__.name.toLowerCase());\n\
      var __validations__ = [];\n\
      Object.defineProperties(self, {\n\
        'errors': {get: #{errors}, enumerable: false },\n\
        'isValid': {get: #{isValid}, enumerable: false }\n\
      });\n\
      \n\
      var validates = #{validates};\n\
      \n\
      var def = #{def};\n\
      var defSelf = #{defSelf};\n\
      \n\
      #{validatesOf}\n\
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
    .replace(/#{Error}/, Xikitita.Error.toString())
    .replace(/#{errors}/, Xikitita.errors.toString())
    .replace(/#{isValid}/, Xikitita.isValid.toString())
    .replace(/#{validatesOf}/, Xikitita.validatesOf())
    .replace(/#{validates}/, Xikitita.validates.toString())
    .replace(/#{def}/, Xikitita.def.toString())
    .replace(/#{defSelf}/, Xikitita.defSelf.toString())
    .replace(/#{new}/, Xikitita.new.toString())
    .replace(/#{body}/, body.toString())
  );
  var Model = eval(name);

  Object.defineProperty(Model, 'toTranslated', {
    get: function(){
      var modelName = Model.name.toLowerCase();
      var pathMember = ['models', modelName, 'member'].join('.');
      var pathCollection = ['models', modelName, 'collection'].join('.');

      return {
        member: I18n.t(pathMember),
        collection: I18n.t(pathCollection)
      }
    }
  });

  Object.defineProperties(Model.prototype, {
    'toJson': { get: function () { return JSON.stringify(this); } },
    'asJson': { get: function () { return JSON.parse(this.toJson); } },
    'Xikitita': { get: function () { return Xikitita; } }
  });

  new Model();

  this.models[name] = Model;
  return this;
}
Xikitita.belongsTo = function(model, options){
    var options = options || {};
    var foreingKey = options.foreingKey || model + '_id';
    var referenceKey = options.referenceKey || 'id';

    Object.defineProperty(self, model, {
      get: function(){
        self[model] = __belongsToModels__[model] || null;
        return __belongsToModels__[model];
      },
      set: function(value){
        value = value || null;

        var modelTitleize = model.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
        var Model = eval( modelTitleize );

        if (value !== null && value.constructor.name === 'Object'){
          value = new Model(value);
        }
        __belongsToModels__[model] = value;

        var idValue = null;
        if (value !== null){
          idValue = value[referenceKey];
        }

        self[foreingKey] = idValue;
      }
    });

    attrAccessible(foreingKey);
    
    __afterNew__.push(function(){
      var value = {};
      value[referenceKey] = self[foreingKey];
      __belongsToModels__[model] = value;
    });
  };

Xikitita.hasOne = function(model, options){
    var options = options || {};
    var foreingKey = options.foreingKey || __model__.name.toLowerCase() + '_id';

    Object.defineProperty(self, model, {
      get: function(){
        self[model] = __hasOneModels__[model] || null;
        return __hasOneModels__[model];
      },
      set: function(value){
        value = value || null;

        var Model = eval( model.capitalize );

        if (value !== null){
          value[foreingKey] = self[__id__];
          if (value.constructor.name === 'Object'){
            value = new Model(value);
          }
        }

        __hasOneModels__[model] = value;
      }
    });
  };

Xikitita.hasMany = function(models, options){
    var options = options || {};
    var foreingKey = options.foreingKey || __model__.name.toLowerCase() + '_id';

    Object.defineProperty(self, models, {
      get: function(){
        self[models] = __hasManyModels__[models];
        return __hasManyModels__[models];
      },
      set: function(values){
        values = values || null;

        var Model = eval( models.singularize.capitalize );

        if (values !== null){
          values.forEach(function(value){
            value[foreingKey] = self[__id__];
            if (value.constructor.name === 'Object'){
              value = new Model(value);
            }
          })
        }

        __hasManyModels__[models] = values;
      }
    });
  };
Xikitita.validates = function(attrName, optionsValidators){
  Object.keys(optionsValidators).forEach(function(validatorName){
    var options = {};
    if (typeof optionsValidators[validatorName] === 'Object') {
      options = optionsValidators[validatorName];
    }

    __validations__.push(function(){
      var value = self[attrName];
      var object = self;

      if (!self.Xikitita.validators[validatorName].call(value, attrName, object, options)) {
        var messageName = self.Xikitita.validators[validatorName].messageName;
        var path = ['errors', 'messages', messageName].join('.');
        __errors__.add(attrName, I18n.t(path));
      };
    });
  });
};

Xikitita.validatesOf = function(){
  var validatesOf = [];

  Object.keys(Xikitita.validators).forEach(function(validator){
    validatesOf.push('var validates#{validator}Of = ' 
        .replace(/#{validator}/, validator.capitalize)
      + function(){
          var attrNames = Array.prototype.slice.call(arguments);
          
          attrNames.forEach(function(attrName){
            validates(attrName, '#{options}');
          });
        }.toString()
        .replace(/'#{options}'/, '{' + validator + ': true}')
      + ';'
    );
  });

  return validatesOf.join('\n');
};

Xikitita.errors = function(){
  return __errors__;
};

Xikitita.isValid = function(){
  __errors__.clear;

  __validations__.forEach(function(validation){
    validation();
  });

  return __errors__.isEmpty;
};

Xikitita.Validator = function(name, messageName, body){
  Xikitita.validators[name] = {messageName: messageName, call: body};
  return this;
}