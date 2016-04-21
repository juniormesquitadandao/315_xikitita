var expect = require('expect.js');
var Xktta = require('../../temp/xktta.js');

describe('Patch Object', function() {

  before(function() {
    Xktta
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

    var number = 0;
    expect(number.isAny).to.be(false);
    number = -1;
    expect(number.isAny).to.be(false);
    expect(false.isAny).to.be(false);

    number = 1;
    expect(number.isAny).to.be(true);
    expect(true.isAny).to.be(true);
    expect(new Date().isAny).to.be(true);
  });

  it('#isEmpty', function () {
    expect({}.isEmpty).to.be(true);
    expect([].isEmpty).to.be(true);
    expect(new function(){}().isEmpty).to.be(true);

    var number = 0;
    expect(number.isEmpty).to.be(true);
    number = -1;
    expect(number.isEmpty).to.be(true);
    expect(false.isEmpty).to.be(true);

    number = 1;
    expect(number.isEmpty).to.be(false);
    expect(true.isEmpty).to.be(false);
  });

});