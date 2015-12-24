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

  Object.defineProperties(Model.prototype, {
    "toJson": { get: function () { return JSON.stringify(this); } },
    "asJson": { get: function () { return JSON.parse(this.toJson); } },
    "Xikitita": { get: function () { return Xikitita; } }
  });

  new Model();

  this.models[name] = Model;
  return this;
}