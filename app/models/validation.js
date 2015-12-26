Xikitita.validates = function(attrName, optionsValidators){
  Object.keys(optionsValidators).forEach(function(validatorName){
    var options = {};
    if (typeof optionsValidators[validatorName] === 'Object') {
      options = optionsValidators[validatorName];
    }

    __validations__.push(function(){
      var value = object[attrName];
      var result = object.Xikitita.validators[validatorName](value, attrName, object, options);

      if (!result.success) {
        var messageName = result.failMessageName;
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
