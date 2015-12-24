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