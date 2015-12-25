Xikitita.Validator = function(name, messageName, body){
  this.validators[name.toLowerCase()] = {messageName: messageName, call: body};
  return this;
}

Xikitita.afterInit.push(function(){

  Xikitita.Validator('Presence', 'blank', function(value, attrName, object, options){
    return value !== null;
  });

});