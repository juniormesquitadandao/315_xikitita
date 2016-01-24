'use strict';

var Xikitita = {
  window: this,
  afterInit: [],
  defineProperties: function(prototype, properties){
    var __this__ = this;

    Object.keys(properties).forEach(function(property){
      __this__.defineProperty(prototype, property, properties[property]);
    });

  },
  defineProperty: function(prototype, property, body){
   
    if(!prototype.hasOwnProperty(property)){
      Object.defineProperty(prototype, property, body);
    } 

  }
};

Object.defineProperty(Xikitita, 'init', {
  get: function(){

    this.classes = {};
    this.inflection = { singular: {}, plural: {} };
    this.translations = {};
    this.validators = {};

    this.afterInit.forEach(function(body){
      body();
    });

    return this;
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
    .interpolate({
      irregular: irregular.toString(),
      body: body.toString()
    })
  );

  return __this__;
}

Xikitita.I18n = function(locale, translations){
  this.translations[locale] = translations || {};
  return this;
}

Xikitita.afterInit.push(function(){
  var __this__ = Xikitita;
  
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
        translation = translation.interpolate(params, '%');
      }else if(typeof translations === 'object' && translations.constructor.name === 'Array'){
        translation = translations;
      }

      return translation;
    },
    localize: function(value, options){
      options = options || {};

      var format = options.format || 'default';
      var dateType = options.dateType || 'date';
      var formatted = value;

      if(typeof value === 'object' && value.constructor.name === 'Date'){
        var dayWeak = value.getDay();
        var month = value.getMonth() + 1;
        var dayMonth = value.getDate();
        var year = value.getFullYear();
        var hours = value.getHours();
        var minutes = value.getMinutes();
        var seconds = value.getSeconds();
        var meridiem = hours < 12 ? 'am' : 'pm';
        var zone = value.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];

        formatted = __this__.translations[I18n.locale][dateType].formats[format];

        var formatBy = {
          function: function(){
            formatted = formatted(value);
          },
          string: function(){
            var to = {
              date: function(){
                formatted = formatted
                  .interpolate({
                    a: I18n.t('date.abbrDayNames')[dayWeak],
                    A: I18n.t('date.dayNames')[dayWeak],
                    m: new String(month + 100).toString().substr(1),
                    b: I18n.t('date.abbrMonthNames')[month],
                    B: I18n.t('date.monthNames')[month],
                    d: new String(dayMonth + 100).toString().substr(1),
                    Y: year
                  }, '%', false);
              },
              time: function(){
                formatted = formatted
                  .interpolate({
                    h: new String( (hours || 24) - 12 + 100 ).toString().substr(1),
                    H: new String(hours + 100).toString().substr(1),
                    M: new String(minutes + 100).toString().substr(1),
                    S: new String(seconds + 100).toString().substr(1),
                    p: I18n.t(['time', meridiem].join('.')),
                    z: zone
                  }, '%', false);
              },
              dateTime: function(){
                this.date();
                this.time();
              }
            }
            to[dateType]();
          }
        }
        
        formatBy[typeof formatted]();
      }
      else if(typeof value === 'number'){
        
        var functionFormat = __this__.translations[I18n.locale].integer.formats[format];
        if(/\./.test(value) || options.forceDecimal){
          functionFormat = __this__.translations[I18n.locale].decimal.formats[format];
        }
        formatted = functionFormat(value);

      }
      else if(typeof value === 'boolean'){
        formatted = __this__.translations[I18n.locale].logic.formats[format][value];
      }

      return formatted;
    }
  }

  I18n.t = I18n.translate
  I18n.l = I18n.localize

});
Xikitita.Error = function(className){
  var __this__ = this;
  var __className__ = className;

  Object.defineProperties(__this__, {

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
          var path = ['attributes', __className__, attrName].join('.');
          var attrNameTranslated = I18n.t(path);

          __this__[attrName].forEach(function(message){
            var fullMessage = I18n
              .t('errors.format')
              .interpolate({
                attribute: attrNameTranslated,
                message: message
              }, '%');

            fullMessages.push(fullMessage);
          });

        });

        return fullMessages;
      }
    }
  });
}

Xikitita.Class = function(name, body){
  
  eval.call(Xikitita.window, "function #{name}(){\n\
      var Xikitita = Xikitita;\n\
      var __class__ =  #{name};\n\
      var __attrAccessor__ = [];\n\
      \n\
      var object = this;\n\
      var attrAccessor = #{attrAccessor};\n\
      \n\
      var __id__ = 'id';\n\
      var id = #{id};\n\
      var __afterNew__ = [];\n\
      \n\
      var __belongsToClasses__ = {};\n\
      var belongsTo = #{belongsTo};\n\
      \n\
      var __hasOneClasses__ = {};\n\
      var hasOne = #{hasOne};\n\
      \n\
      var __hasManyClasses__ = {};\n\
      var hasMany = #{hasMany};\n\
      \n\
      var __errors__ = new #{Error}(__class__.name.toLowerCase());\n\
      var __validations__ = [];\n\
      Object.defineProperties(object, {\n\
        'errors': {get: #{errors}, enumerable: false },\n\
        'isValid': {get: #{isValid}, enumerable: false }\n\
      });\n\
      \n\
      var validate = #{validate};\n\
      \n\
      var validates = #{validates};\n\
      \n\
      var def = #{def};\n\
      var defClass = #{defClass};\n\
      \n\
      #{validatesOf}\n\
      \n\
      (#{body})(object);\n\
      attrAccessor();\n\
      \n\
      var __initAttributes__ =  Array.prototype.slice.call(arguments).shift() || {};\n\
      (#{new})(object);\n\
      \n\
      Object.defineProperties(object, {\n\
        'reset': {get: #{reset}, enumerable: false },\n\
        'changes': {get: #{changes}, enumerable: false },\n\
        'changed': {get: #{changed}, enumerable: false }\n\
      });\n\
    };"
    .interpolate({
      name: name,
      attrAccessor: Xikitita.attrAccessor.toString(),
      id: Xikitita.id.toString(),
      belongsTo: Xikitita.belongsTo.toString(),
      hasOne: Xikitita.hasOne.toString(),
      hasMany: Xikitita.hasMany.toString(),
      Error: Xikitita.Error.toString(),
      errors: Xikitita.errors.toString(),
      isValid: Xikitita.isValid.toString(),
      validate: Xikitita.validate.toString(),
      validates: Xikitita.validates.toString(),
      def: Xikitita.def.toString(),
      defClass: Xikitita.defClass.toString(),
      validatesOf: Xikitita.validatesOf(),
      body: body.toString(),
      new: Xikitita.new.toString(),
      reset: Xikitita.reset.toString(),
      changes: Xikitita.changes.toString(),
      changed: Xikitita.changed.toString()
    })
  );
  var Class = eval(name);

  Object.defineProperty(Class, 'toTranslated', {
    get: function(){
      var className = Class.name.toLowerCase();
      var pathMember = ['classes', className, 'member'].join('.');
      var pathCollection = ['classes', className, 'collection'].join('.');

      return {
        member: I18n.t(pathMember),
        collection: I18n.t(pathCollection)
      }
    }
  });

  Object.defineProperties(Class.prototype, {
    Xikitita: { get: function () { return Xikitita; } }
  });

  this.classes[name] = Class;
  return this;
}

Xikitita.id = function(id){
  __id__ = id;

  Object.defineProperty(object, '__idValue__', {
    get: function(){ return object[__id__]; }
  });
};

Xikitita.attrAccessor = function(){
  var attrNames = Array.prototype.slice.call(arguments);
  if(__attrAccessor__.length === 0){
    attrNames.unshift(__id__);
  }

  attrNames.forEach(function(attrName){
    object[attrName] = null;
    __attrAccessor__.push(attrName);
  });
};

Xikitita.new = function(){
  function defineChangesToAttrName(attrName){
    var changes_attrName = ['changes', attrName].join('_');
    if(!object.hasOwnProperty(changes_attrName)){
      Object.defineProperty(object, changes_attrName, {
        get: function(){
          return this.changes[attrName] || [];
        }
      });
    }
  }

  function defineChangedToAttrName(attrName){
    var changes_attrName = ['changes', attrName].join('_');
    var changed_attrName = ['changed', attrName].join('_');
    if(!object.hasOwnProperty(changed_attrName)){
      Object.defineProperty(object, changed_attrName, {
        get: function(){
          return this[changes_attrName].isAny;
        }
      });
    }
  }

  if(typeof __initAttributes__ === 'string'){
    __initAttributes__ = JSON.parse(__initAttributes__);
  }
  
  __attrAccessor__.forEach(function(attrName){
    __afterNew__.push(function(){
      defineChangesToAttrName(attrName);
      defineChangedToAttrName(attrName);
    });
  });

  Object.keys(__initAttributes__).forEach(function(attrName){
    if(__attrAccessor__.indexOf(attrName) < 0){
      throw new TypeError(__class__.name.toLowerCase() + '.' + attrName + ' is not a attribute');
    }
    object[attrName] = __initAttributes__[attrName];
  });

  __afterNew__.forEach(function(callback){
    callback();
  });
};

Xikitita.reset = function(){ 
  Object.keys(__belongsToClasses__).forEach(function(belongsTo){
    object[belongsTo] = null;
  });

  Object.keys(__hasOneClasses__).forEach(function(hasOne){
    object[hasOne] = null;
  });

  Object.keys(__hasManyClasses__).forEach(function(hasMany){
    object[hasMany] = [];
  });

  Object.keys(__initAttributes__).forEach(function(attrName){
    object[attrName] = __initAttributes__[attrName];
  });

  Object.keys(object).forEach(function(attrName){
    if(!__initAttributes__.hasOwnProperty(attrName)){
      object[attrName] = null;
    }
  });

  __afterNew__.forEach(function(callback){
    callback();
  });
};

Xikitita.changes = function(){
  var changes = {};

  __attrAccessor__.forEach(function(attrName){
  
      var initialValue = __initAttributes__[attrName] === undefined ? null : __initAttributes__[attrName];
      var actualValue = object[attrName];

      if(initialValue && typeof initialValue === 'object' && actualValue && typeof actualValue === 'object'){
        initialValue = initialValue.asJson;

        if(!__hasManyClasses__.hasOwnProperty(attrName)){
          Object.keys(actualValue).forEach(function(attrName){
            if(!initialValue.hasOwnProperty(attrName)){
              initialValue[attrName] = null;
            }
          });          
        }

        if(initialValue.toJson !== actualValue.toJson){
          changes[attrName] = [initialValue, actualValue];
        }
      }else if(initialValue !== actualValue){
        changes[attrName] = [initialValue, actualValue];
      }

  });

  return changes;
};

Xikitita.changed = function(){
  return this.changes.isAny;
};

Xikitita.def = function(name, body){
  Object.defineProperty(object, name, {
    value: body, 
    enumerable: false
  });
};

Xikitita.defClass = function(name, body){
  __class__[name] = __class__[name] || body;
};
Xikitita.belongsTo = function(classNameSingularized, options){
  var options = options || {};
  var foreingKey = options.foreingKey || classNameSingularized + '_id';
  var referenceKey = options.referenceKey || 'id';

  Object.defineProperty(object, classNameSingularized, {
    get: function(){
      object[classNameSingularized] = __belongsToClasses__[classNameSingularized];
      return __belongsToClasses__[classNameSingularized];
    },
    set: function(value){
      value = value || null;

      var classTitleize = classNameSingularized.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
      var Class = eval( classTitleize );

      if (value !== null && value.constructor.name === 'Object'){
        value = new Class(value);
      }
      __belongsToClasses__[classNameSingularized] = value;

      var idValue = null;
      if (value !== null){
        idValue = value[referenceKey];
      }

      object[foreingKey] = idValue;
    }
  });

  __belongsToClasses__[classNameSingularized] = null;

  attrAccessor(foreingKey);
  
  __afterNew__.push(function(){
    if(__initAttributes__.hasOwnProperty(foreingKey)){
      var value = {};
      value[referenceKey] = object[foreingKey];
      __belongsToClasses__[classNameSingularized] = value;
    }
  });
};

Xikitita.hasOne = function(classNameSingularized, options){
  var options = options || {};
  var foreingKey = options.foreingKey || __class__.name.toLowerCase() + '_id';

  Object.defineProperty(object, classNameSingularized, {
    get: function(){
      object[classNameSingularized] = __hasOneClasses__[classNameSingularized];
      return __hasOneClasses__[classNameSingularized];
    },
    set: function(value){
      value = value || null;

      var Class = eval( classNameSingularized.capitalize );

      if (value !== null){
        value[foreingKey] = object[__id__];
        if (value.constructor.name === 'Object'){
          value = new Class(value);
        }
      }

      __hasOneClasses__[classNameSingularized] = value;
    }
  });

  __hasOneClasses__[classNameSingularized] = null;

  attrAccessor(classNameSingularized);
};

Xikitita.hasMany = function(classNamePluralized, options){
  var options = options || {};
  var foreingKey = options.foreingKey || __class__.name.toLowerCase() + '_id';

  Object.defineProperty(object, classNamePluralized, {
    get: function(){
      __hasManyClasses__[classNamePluralized] = __hasManyClasses__[classNamePluralized] || [];
      object[classNamePluralized] = __hasManyClasses__[classNamePluralized];
      return __hasManyClasses__[classNamePluralized];
    },
    set: function(values){
      values = values || null;

      var Class = eval( classNamePluralized.singularize.capitalize );

      if (values !== null){
        values = values.map(function(value){
          value[foreingKey] = object[__id__];
          if (value.constructor.name === 'Object'){
            value = new Class(value);
          }
          return value;
        })
      }

      __hasManyClasses__[classNamePluralized] = values;
    }
  });

  attrAccessor(classNamePluralized);
  
  __afterNew__.push(function(){
    if(!__initAttributes__.hasOwnProperty(classNamePluralized)){
      __initAttributes__[classNamePluralized] = [];
    }
  });
};
Xikitita.validate = function(attrName, body){

  __validations__.push(function(){
    var result = body.call();

    if (!result.success) {
      var messageName = result.fail.messageName;
      var path = ['errors', 'messages', messageName].join('.');
      var params = result.fail.params || {};

      __errors__.add(attrName, I18n.t(path, params));
    };
  });

};

Xikitita.validates = function(attrName, optionsValidators){
  Object.keys(optionsValidators).forEach(function(validatorName){
    var options = {};
    if (typeof optionsValidators[validatorName] === 'object') {
      options = optionsValidators[validatorName];
    }

    __validations__.push(function(){
      var value = object[attrName];
      var result = object.Xikitita.validators[validatorName](value, attrName, object, options);

      if (!result.success) {
        var messageName = result.fail.messageName;
        var path = ['errors', 'messages', messageName].join('.');
        var params = result.fail.params || {};

        __errors__.add(attrName, I18n.t(path, params));
      };
    });
  });
};

Xikitita.validatesOf = function(){
  var validatesOf = [];

  Object.keys(Xikitita.validators).forEach(function(validator){

    validatesOf.push('var validates#{validator}Of = ' 
        .interpolate({
          validator: validator.capitalize
        })
      + function(){

          var attrNames = Array.prototype.slice.call(arguments);
          var last = attrNames.pop();

          var validatorName = '#{validatorName}';
          var options = {};
          options[validatorName] = true;

          if(typeof last === 'object'){
            options[validatorName] = last;
          }else{
            attrNames.push(last);          
          }

          attrNames.forEach(function(attrName){
            validates(attrName, options);
          });

        }.toString()
        .interpolate({
          validatorName: validator
        })
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

Xikitita.Validator = function(name, body){
  this.validators[name.toLowerCase()] = body;
  return this;
}

Xikitita.afterInit.push(function(){

  Xikitita.Validator('Presence', function(value, attrName, object, options){
    
    return {
      success: value ? value.isAny : ['number', 'boolean'].indexOf(typeof value) > -1,
      fail: {
        messageName: 'blank'
      }
    };
  });

});
Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(Object.prototype, {
    toJson: {
      get: function () {
        var __toJson__ = this;
        if(typeof this !== 'string'){
          __toJson__ = JSON.stringify(__toJson__);
        }
        return __toJson__; 
      }
    },
    asJson: {
      get: function () { 
        return JSON.parse(this.toJson); 
      } 
    },
    isAny: {
      get: function () {
        return (this.constructor.name === 'Number' && this > 0) || (this.constructor.name === 'Boolean' && this) || Object.keys(this).length > 0; 
      }
    },
    isEmpty: { 
      get: function () { 
        return !this.isAny;
      }
    }
  });

});

Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(String.prototype, {
    capitalize: { 
      get: function(){
        return this.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
      }
    },
    pluralize: { 
      get: function(){
        var irregular = this;
        var regex = irregular;
        var replace = Xikitita.inflection.singular[irregular] || null;

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
        var replace = Xikitita.inflection.plural[irregular] || null;

        if(!replace){
          regex = /s$/;
          replace = '';
        }

        return this.replace(regex, replace);
      }
    },
    interpolate: { 
      value: function(params, identifier, isBoundary){
        identifier = identifier || '#';
        isBoundary = isBoundary === undefined ? true : isBoundary;

        var boundary = !isBoundary ? '  ' : '{}';
        var interpolated = this;

        Object.keys(params).forEach(function(param){
          var regex = [identifier, boundary[0].trim(), param, boundary[1].trim()].join('');
          interpolated = interpolated.replace(new RegExp(regex, 'g'), params[param]);
        });

        return interpolated;
      }
    }
  });

});
Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(Date.prototype, {
    localize: {
      value: function (options) {
        return this.l(options); 
      }
    },
    l: {
      value: function (options) {
        return I18n.l(this, options); 
      }
    },
  });

});

Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(Number.prototype, {
    localize: {
      value: function (options) {
        return this.l(options); 
      }
    },
    l: {
      value: function (options) {
        return I18n.l(this, options); 
      }
    },
  });

});

Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(Boolean.prototype, {
    localize: {
      value: function (options) {
        return this.l(options); 
      }
    },
    l: {
      value: function (options) {
        return I18n.l(this, options); 
      }
    },
  });

});
