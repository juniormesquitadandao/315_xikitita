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

  it('::classes', function () {
    var classNames = Object.keys(Xikitita.classes).join(', ');

    expect(classNames).to.be('Customer, User, Permission, Stub');
  });

});