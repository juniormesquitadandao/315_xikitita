Xikitita.Validator = function(name, messageName, body){
  Xikitita.validators[name] = {messageName: messageName, call: body};
  return this;
}