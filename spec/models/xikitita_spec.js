var expect = require('expect.js');
var Xikitita = require('./xikitita.js');

describe('Xikitita', function() {
  
  before(function() {
    Xikitita
      .init
      .Model('Cliente', function(){
      })
      .Model('User', function(){
      })
      .Model('Permission', function(){
      })
      .Model('Stub', function(){
      });
  });

  it('::models', function () {
    var modelNames = Object.keys(Xikitita.models).join(', ');

    expect(modelNames).to.be('Cliente, User, Permission, Stub');
  });

});