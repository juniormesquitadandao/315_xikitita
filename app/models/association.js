Xikitita.belongsTo = function(classNameSingularized, options){
    var options = options || {};
    var foreingKey = options.foreingKey || classNameSingularized + '_id';
    var referenceKey = options.referenceKey || 'id';

    Object.defineProperty(object, classNameSingularized, {
      get: function(){
        object[classNameSingularized] = __belongsToClasses__[classNameSingularized] || null;
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

    attrAccessible(foreingKey);
    
    __afterNew__.push(function(){
      var value = {};
      value[referenceKey] = object[foreingKey];
      __belongsToClasses__[classNameSingularized] = value;
    });
  };

Xikitita.hasOne = function(classNameSingularized, options){
    var options = options || {};
    var foreingKey = options.foreingKey || __class__.name.toLowerCase() + '_id';

    Object.defineProperty(object, classNameSingularized, {
      get: function(){
        object[classNameSingularized] = __hasOneClasses__[classNameSingularized] || null;
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
  };

Xikitita.hasMany = function(classNamePluralized, options){
    var options = options || {};
    var foreingKey = options.foreingKey || __class__.name.toLowerCase() + '_id';

    Object.defineProperty(object, classNamePluralized, {
      get: function(){
        object[classNamePluralized] = __hasManyClasses__[classNamePluralized];
        return __hasManyClasses__[classNamePluralized];
      },
      set: function(values){
        values = values || null;

        var Class = eval( classNamePluralized.singularize.capitalize );

        if (values !== null){
          values.forEach(function(value){
            value[foreingKey] = object[__id__];
            if (value.constructor.name === 'Object'){
              value = new Class(value);
            }
          })
        }

        __hasManyClasses__[classNamePluralized] = values;
      }
    });
  };