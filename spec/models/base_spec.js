var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Base', function() {
  
  before(function() {
    Xikitita
      .init
      .Model('Customer', function(){
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

    expect(modelNames).to.be('Customer, User, Permission, Stub');
  });

});