var expect = require('expect.js');
var Xktta = require('../../temp/xktta.js');

describe('Error', function() {

  before(function() {
    Xktta
      .init
      .I18n('en', {
        errors:{
          format: '%{attribute} %{message}',
          messages: {
            blank: "can't be blank"
          }
        },
        'classes': {
          stub: {
            attributes: {
              attrName1: 'one',
              attrName2: 'two'
            }
          }
        }
      })
      .Class('Stub', function(){
        attrAccessor('attrName1', 'attrName2');

        validatesPresenceOf('attrName1', 'attrName2');
      });
  });

  it('#toJson', function () {
    var error = new Xktta.Error();

    expect(error.toJson).to.be('{}');
  });

  it('#asJson', function () {
    var error = new Xktta.Error();

    expect(error.asJson).to.be.a(Object);
  });

  it('#isAny', function () {
    var error = new Xktta.Error();

    expect(error.isAny).to.be(false);
    error.x = [];
    expect(error.isAny).to.be(true);
  });

  it('#isEmpty', function () {
    var error = new Xktta.Error();

    expect(error.isEmpty).to.be(true);
    error.x = [];
    expect(error.isEmpty).to.be(false);
  });

  it('#add', function(){
    var error = new Xktta.Error();

    error.add('attrName1', 'message1');
    expect(error.attrName1).to.be.a(Array);
    expect(error['attrName1']).to.be.a(Array);

    error.add('attrName1', 'message2');
    error.add('attrName2', 'message1');
    expect(error.toJson).to.be('{"attrName1":["message1","message2"],"attrName2":["message1"]}');
  });

  it('#clear', function () {
    var error = new Xktta.Error();

    error.x = [];
    error.clear;
    expect(error.isEmpty).to.be(true);
  });

  it('#messages', function () {
    var error = new Xktta.Error();

    error.add('attrName1', 'message2');
    error.add('attrName2', 'message1');

    expect(error.messages.toJson).to.be('["message2","message1"]');
  });

  it('#fullMessages', function () {
    var error = new Stub().errors;

    error.add('attrName1', 'message2');
    error.add('attrName2', 'message1');

    expect(error.fullMessages.toJson).to.be('["one message2","two message1"]');
  });

});