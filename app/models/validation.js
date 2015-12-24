Xikitita.validates = function(attrName, validators){
  Object.keys(validators).forEach(function(validator){
    var options = Object.create({});
    if (typeof validators[validator] === 'Object') {
      options = Object.create(validators[validator]);
    }

    __validations__.push(function(){
      if (!self.Xikitita.validators[validator].call(self[attrName], attrName, self, options)) {
        var messageKey = self.Xikitita.validators[validator].messageKey;
        __errors__.add(attrName, I18n.t('errors.messages.' + messageKey));
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
