var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');

describe('Xikitita', function() {
  
  before(function() {
    Xikitita
      .init
      .Model('Cliente', function(){
        attrAccessible('name', 'phone');
      })
      .Model('User', function(){
        attrAccessible('email');
        belongsTo('cliente');
        belongsTo('permission');
      })
      .Model('Permission', function(){
        attrAccessible('name');
        hasMany('clientes');
      })
      .Model('Stub', function(){
      });
  });

  it('::models', function () {
    var modelNames = Object.keys(Xikitita.models).join(', ');

    expect(modelNames).to.be('Cliente, User, Permission, Stub');
  });

});