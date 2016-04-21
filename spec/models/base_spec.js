var expect = require('expect.js');
var Xktta = require('../../temp/xktta.js');

describe('Base', function() {

  before(function() {
    Xktta
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
    var classNames = Object.keys(Xktta.classes).join(', ');

    expect(classNames).to.be('Customer, User, Permission, Stub');
  });

});