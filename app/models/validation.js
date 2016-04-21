Xktta.validate = function(attrName, body){

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

Xktta.validates = function(attrName, optionsValidators){
  Object.keys(optionsValidators).forEach(function(validatorName){
    var options = {};
    if (typeof optionsValidators[validatorName] === 'object') {
      options = optionsValidators[validatorName];
    }

    __validations__.push(function(){
      var value = object[attrName];
      var result = object.Xktta.validators[validatorName](value, attrName, object, options);

      if (!result.success) {
        var messageName = result.fail.messageName;
        var path = ['errors', 'messages', messageName].join('.');
        var params = result.fail.params || {};

        __errors__.add(attrName, I18n.t(path, params));
      };
    });
  });
};

Xktta.validatesOf = function(){
  var validatesOf = [];

  Object.keys(Xktta.validators).forEach(function(validator){

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

Xktta.errors = function(){
  return __errors__;
};

Xktta.isValid = function(){
  __errors__.clear;

  __validations__.forEach(function(validation){
    validation();
  });

  return __errors__.isEmpty;
};
