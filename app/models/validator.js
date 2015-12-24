Xikitita.Validator = function(name, messageKey, body){
  Xikitita.validators[name] = {messageKey: messageKey, call: body};

  return this;
}

Xikitita.Validator('presence', 'blank', function(value, attrName, instance, options){
  return value !== null;
});
