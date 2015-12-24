var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Base', function() {
  
  before(function() {
    Xikitita
      .init
      .Class('Customer', function(){
      })
      .Class('User', function(){
      })
      .Class('Permission', function(){
      })
      .Class('Stub', function(){
      });
  });

  it('::models', function () {
    var modelNames = Object.keys(Xikitita.models).join(', ');

    expect(modelNames).to.be('Customer, User, Permission, Stub');
  });

});