var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Model', function() {

  before(function() {
    Xikitita
      .init
      .Model('Customer', function(){
        attrAccessible('name', 'phone');
      })
      .Model('User', function(){
        attrAccessible('email');
        belongsTo('customer');
        belongsTo('permission');
      })
      .Model('Permission', function(){
        attrAccessible('name');
        hasMany('customers');
      })
      .Model('Stub', function(){

        def('instanceMethod', function(){
          return this;
        });

        defSelf('classMethod', function(){
          return this.name;
        });

      });
  });

  it('::name', function () {
    expect(Customer.name).to.be('Customer');
    expect(User.name).to.be('User');
    expect(Permission.name).to.be('Permission');
    expect(Stub.name).to.be('Stub');
  });

  it('::def', function() {
    expect(new Stub().instanceMethod().toJson).to.be('{"id":null}');
  });

  it('::defSelf', function() {
    expect(Stub.classMethod()).to.be('Stub');
  });

  it('#toJson', function () {
    expect(new Stub().toJson).to.be('{"id":null}');
  });

  it('#asJson', function () {
    expect(new Stub().asJson).to.be.a(Object);
  });

  it('#new', function () {
    expect(Stub).withArgs({two: 'value'}).to.throwException(function (exception) {
      expect(exception).to.be.a(TypeError);
      expect(exception.message).to.be('stub.two is not a attribute');
    })

    Xikitita
      .Model('Stub', function(){
        attrAccessible('one', 'two');
      })

    expect(new Stub().toJson).to.be('{"id":null,"one":null,"two":null}');
    expect(new Stub({}).toJson).to.be('{"id":null,"one":null,"two":null}');
    expect(new Stub('{}').toJson).to.be('{"id":null,"one":null,"two":null}');

    expect(new Stub({one: 'value'}).toJson).to.be('{"id":null,"one":"value","two":null}');
    expect(new Stub({'one': 0}).toJson).to.be('{"id":null,"one":0,"two":null}');

    expect(new Stub('{"one": "value"}').toJson).to.be('{"id":null,"one":"value","two":null}');
    expect(new Stub('{"one": 0}').toJson).to.be('{"id":null,"one":0,"two":null}');
  });


  it('primaryKey', function () {
    Xikitita
      .Model('Stub', function(){
        id('id_stub');
      })

    expect(new Stub().__idValue__).to.be(null);
    expect(new Stub().toJson).to.be('{"id_stub":null}');
    expect(new Stub({id_stub: 1}).toJson).to.be('{"id_stub":1}');
  });

  it('foreingKey', function () {
    Xikitita
      .Model('Stub', function(){
      })
      .Model('Stub2', function(){
        belongsTo('stub', {foreingKey: 'id_stub'});
      })

    expect(new Stub2({id_stub: 1}).toJson).to.be('{"id":null,"id_stub":1}');
    expect(new Stub2({id_stub: 1}).stub).to.be.a(Stub);
  });

  it('referenceKey', function () {
    Xikitita
      .Model('Stub', function(){
        id('id_stub');
      })
      .Model('Stub2', function(){
        belongsTo('stub', {referenceKey: 'id_stub'});
      })

    expect(new Stub2({stub_id: 1}).toJson).to.be('{"id":null,"stub_id":1}');
    expect(new Stub2({stub_id: 1}).stub).to.be.a(Stub);
  });

  it('attrAccessible', function () {
    expect(new Customer().toJson).to.be('{"id":null,"name":null,"phone":null}');
  });
});