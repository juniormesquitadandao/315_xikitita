var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Array', function() {

  before(function() {
    Xikitita
      .init;
  });
  
  it('#toJson', function () {
    expect({}.toJson).to.be('{}');
  });

  it('#asJson', function () {
    expect({}.asJson).to.be.a(Object);
  });

  it('#isAny', function () {
    expect({}.isAny).to.be(false);
  });

  it('#isEmpty', function () {
    expect({}.isEmpty).to.be(true);
  });

});