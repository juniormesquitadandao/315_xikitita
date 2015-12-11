var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');

describe('Error', function() {

  it('#toJson', function () {
    var error = new Xikitita.Error();

    expect(error.toJson).to.be('{}');
  });

  it('#asJson', function () {
    var error = new Xikitita.Error();

    expect(error.asJson).to.be.a(Object);
  });

  it('#isAny', function () {
    var error = new Xikitita.Error();

    expect(error.isAny).to.be(false);
    error.x = [];
    expect(error.isAny).to.be(true);
  });

  it('#isEmpty', function () {
    var error = new Xikitita.Error();

    expect(error.isEmpty).to.be(true);
    error.x = [];
    expect(error.isEmpty).to.be(false);
  });

  it('#add', function(){
    var error = new Xikitita.Error();

    error.add('attrName1', 'message1');
    expect(error.attrName1).to.be.a(Array);
    expect(error['attrName1']).to.be.a(Array);

    error.add('attrName1', 'message2');
    error.add('attrName2', 'message1');
    expect(error.toJson).to.be('{"attrName1":["message1","message2"],"attrName2":["message1"]}');    
  });

  it('#clear', function () {
    var error = new Xikitita.Error();

    error.x = [];
    error.clear;
    expect(error.isEmpty).to.be(true);
  });

  it('#messages', function () {
    expect(error.messages.toJson).to.be('[]');
  });

  it('#fullMessages', function () {
    expect(error.fullMessages.toJson).to.be('[]');
  });

});