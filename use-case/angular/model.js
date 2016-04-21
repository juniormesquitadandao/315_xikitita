Xktta
.Class('Model', function(){

  attrAccessor('text', 'integer', 'decimal');
  attrAccessor('date', 'time', 'datetime');
  attrAccessor('logic');

  validatesPresenceOf('text', 'integer', 'decimal');
  validatesPresenceOf('date', 'time', 'datetime');

  validatesLengthOf('text', {in: [1, 32]});

});