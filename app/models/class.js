Xktta.Class = function(name, body){

  eval.call(Xktta.window, "function #{name}(){\n\
      var Xktta = Xktta;\n\
      var __class__ =  #{name};\n\
      var __attrAccessor__ = [];\n\
      \n\
      var object = this;\n\
      var attrAccessor = #{attrAccessor};\n\
      \n\
      var __afterNew__ = [];\n\
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
        'changed': {get: #{changed}, enumerable: false },\n\
        'toHuman': {get: #{toHuman}, enumerable: false }\n\
      });\n\
    };"
    .interpolate({
      name: name,
      attrAccessor: Xktta.attrAccessor.toString(),
      Error: Xktta.Error.toString(),
      errors: Xktta.errors.toString(),
      isValid: Xktta.isValid.toString(),
      validate: Xktta.validate.toString(),
      validates: Xktta.validates.toString(),
      def: Xktta.def.toString(),
      defClass: Xktta.defClass.toString(),
      validatesOf: Xktta.validatesOf(),
      body: body.toString(),
      new: Xktta.new.toString(),
      reset: Xktta.reset.toString(),
      changes: Xktta.changes.toString(),
      changed: Xktta.changed.toString(),
      toHuman: Xktta.toHuman.toString()
    })
  );
  var Class = eval(name);

  Object.defineProperty(Class, 'toHuman', {
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
    Xktta: { get: function () { return Xktta; } }
  });

  this.classes[name] = Class;
  return this;
}

Xktta.attrAccessor = function(){
  var attrNames = Array.prototype.slice.call(arguments);

  attrNames.forEach(function(attrName){
    object[attrName] = null;
    __attrAccessor__.push(attrName);
  });
};

Xktta.new = function(){
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

  __attrAccessor__.forEach(function(attrName){
    if(Object.keys(__initAttributes__).indexOf(attrName) < 0){
      __initAttributes__[attrName] = null;
    }
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

Xktta.reset = function(){
  Object.keys(object).forEach(function(attrName){
    object[attrName] = __initAttributes__[attrName];
  });

  __afterNew__.forEach(function(callback){
    callback();
  });
};

Xktta.changes = function(){
  var changes = {};

  __attrAccessor__.forEach(function(attrName){

      var initialValue = __initAttributes__[attrName];
      var actualValue = object[attrName];

      if(initialValue === null && actualValue !== null){
        changes[attrName] = [initialValue, actualValue];
      } else if(initialValue !== null && actualValue === null){
        changes[attrName] = [initialValue, actualValue];
      } else if(initialValue !== null && actualValue !== null && initialValue.toJson !== actualValue.toJson){
        changes[attrName] = [initialValue, actualValue];
      }

  });

  return changes;
};

Xktta.changed = function(){
  return this.changes.isAny;
};

Xktta.def = function(name, body){
  Object.defineProperty(object, name, {
    value: body,
    enumerable: false
  });
};

Xktta.defClass = function(name, body){
  __class__[name] = __class__[name] || body;
};

Xktta.toHuman = function(){
  var attributes = {};
  var className = __class__.name.toLowerCase();

  __attrAccessor__.forEach(function(attrName){

    Object.defineProperty(attributes, attrName, {

      get: function(){

        var path = ['classes', className, 'attributes', attrName].join('.');

        return I18n.t(path);

      }

    });

  });

  return attributes;
};