Xikitita.Validator = function(name, body){
  this.validators[name.toLowerCase()] = body;
  return this;
}

Xikitita.afterInit.push(function(){

  Xikitita.Validator('Presence', function(value, attrName, object, options){
    
    return {
      success: value ? value.isAny : ['number', 'boolean'].indexOf(typeof value) > -1,
      fail: {
        messageName: 'blank'
      }
    };
  });

});