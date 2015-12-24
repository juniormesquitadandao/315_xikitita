Xikitita.Validator = function(name, messageKey, body){
  Xikitita.validators[name] = {messageKey: messageKey, call: body};

  return this;
}