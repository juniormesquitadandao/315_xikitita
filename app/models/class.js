Xikitita.Class = function(name, body){
  
  eval.call(Xikitita.window, "function #{name}(){\n\
      var Xikitita = Xikitita;\n\
      var __class__ =  #{name};\n\
      var __attrAccessible__ = [];\n\
      \n\
      var object = this;\n\
      var attrAccessible = #{attrAccessible};\n\
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
      var validates = #{validates};\n\
      \n\
      var def = #{def};\n\
      var defClass = #{defClass};\n\
      \n\
      #{validatesOf}\n\
      \n\
      (#{body})(object);\n\
      attrAccessible();\n\
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
    .replace(/#{name}/g, name)
    .replace(/#{attrAccessible}/, Xikitita.attrAccessible.toString())
    .replace(/#{id}/, Xikitita.id.toString())
    .replace(/#{belongsTo}/, Xikitita.belongsTo.toString())
    .replace(/#{hasOne}/, Xikitita.hasOne.toString())
    .replace(/#{hasMany}/, Xikitita.hasMany.toString())
    .replace(/#{Error}/, Xikitita.Error.toString())
    .replace(/#{errors}/, Xikitita.errors.toString())
    .replace(/#{isValid}/, Xikitita.isValid.toString())
    .replace(/#{validates}/, Xikitita.validates.toString())
    .replace(/#{def}/, Xikitita.def.toString())
    .replace(/#{defClass}/, Xikitita.defClass.toString())
    .replace(/#{validatesOf}/, Xikitita.validatesOf())
    .replace(/#{body}/, body.toString())
    .replace(/#{new}/, Xikitita.new.toString())
    .replace(/#{reset}/, Xikitita.reset.toString())
    .replace(/#{changes}/, Xikitita.changes.toString())
    .replace(/#{changed}/, Xikitita.changed.toString())
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

  new Class();

  this.classes[name] = Class;
  return this;
}

Xikitita.id = function(id){
  __id__ = id;

  Object.defineProperty(object, '__idValue__', {
    get: function(){ return object[__id__]; }
  });
};

Xikitita.attrAccessible = function(){
  var attrNames = Array.prototype.slice.call(arguments);
  if(__attrAccessible__.length === 0){
    attrNames.unshift(__id__);
  }

  attrNames.forEach(function(attrName){
    object[attrName] = null;
    __attrAccessible__.push(attrName);
  });
};

Xikitita.new = function(){
  if(typeof __initAttributes__ === 'string'){
    __initAttributes__ = JSON.parse(__initAttributes__);
  }
  
  __attrAccessible__.forEach(function(attrName){
    if(typeof __initAttributes__[attrName] === 'undefined'){
      __initAttributes__[attrName] = null;
    }

    var attrName = attrName;
    __afterNew__.push(function(){

      var changes_attrName = ['changes', attrName].join('_');
      Object.defineProperty(object, changes_attrName, {
        get: function(){
          return this.changes[attrName] || [];
        }
      });

      var changed_attrName = ['changed', attrName].join('_');
      Object.defineProperty(object, changed_attrName, {
        get: function(){
          return this[changes_attrName].isAny;
        }
      });

    });
  });

  Object.keys(__initAttributes__).forEach(function(attrName){
    if(__attrAccessible__.indexOf(attrName) < 0){
      throw new TypeError(__class__.name.toLowerCase() + '.' + attrName + ' is not a attribute');
    }
    object[attrName] = __initAttributes__[attrName];
  });

  __afterNew__.forEach(function(callback){
    callback();
  })
};

Xikitita.reset = function(){ 
  Object.keys(__initAttributes__).forEach(function(attrName){
    object[attrName] = __initAttributes__[attrName];
  });
};

Xikitita.changes = function(){
  var changes = {};

  __attrAccessible__.forEach(function(attrName){
    var initialValue = __initAttributes__[attrName] || null;
    var actualValue = object[attrName];

    if(initialValue !== actualValue){
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