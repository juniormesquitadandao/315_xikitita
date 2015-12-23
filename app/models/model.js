Xikitita.id = function(id){
  __id__ = id;

  Object.defineProperty(self, '__idValue__', {
    get: function(){ return self[__id__]; }
  });
};

Xikitita.attrAccessible = function(){
  var attrNames = Array.prototype.slice.call(arguments);
  if(__attrAccessible__.length === 0){
    attrNames.unshift(__id__);
  }

  attrNames.forEach(function(attrName){
    self[attrName] = null;
    __attrAccessible__.push(attrName);
  });
};
