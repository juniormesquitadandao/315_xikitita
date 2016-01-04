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