Xikitita.Validator = function(name, messageName, body){
  this.validators[name] = {messageName: messageName, call: body};
  return this;
}

Xikitita.afterInit.push(function(){

  Xikitita.Validator('presence', 'blank', function(value, attrName, object, options){
    return value !== null;
  });

});