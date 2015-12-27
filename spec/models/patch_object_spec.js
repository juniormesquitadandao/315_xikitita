var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Patch Object', function() {

  before(function() {
    Xikitita
      .init;
  });
  
  it('#toJson', function () {
    expect({}.toJson).to.be('{}');
    expect([].toJson).to.be('[]');
    expect(new function(){}().toJson).to.be('{}');
    expect('{}'.toJson).to.be('{}');
  });

  it('#asJson', function () {
    expect({}.asJson).to.be.a(Object);
    expect([].asJson).to.be.a(Object);
    expect(new function(){}().asJson).to.be.a(Object);
    expect('{}'.asJson).to.be.a(Object);
  });

  it('#isAny', function () {
    expect({}.isAny).to.be(false);
    expect([].isAny).to.be(false);
    expect(new function(){}().isAny).to.be(false);
  });

  it('#isEmpty', function () {
    expect({}.isEmpty).to.be(true);
    expect([].isEmpty).to.be(true);
    expect(new function(){}().isEmpty).to.be(true);
  });

});