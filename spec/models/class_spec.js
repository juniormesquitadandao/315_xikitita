var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Class', function() {

  before(function() {
    Xikitita
      .init
      .I18n('en', {
        classes: {
          customer: {
            member: 'one customer',
            collection: 'many customers'
          },
          user: {
            member: 'one user',
            collection: 'many users'
          },
          permission: {
            member: 'one permission',
            collection: 'many permissions'
          },
          stub: {
            member: 'one stub',
            collection: 'many stub'
          }
        }
      })
      .Class('Customer', function(){
        attrAccessible('name', 'phone');
      })
      .Class('User', function(){
        attrAccessible('email');
        belongsTo('customer');
        belongsTo('permission');
      })
      .Class('Permission', function(){
        attrAccessible('name');
        hasMany('customers');
      })
      .Class('Stub', function(){

        def('objectMethod', function(){
          return this;
        });

        defClass('classMethod', function(){
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
    expect(new Stub().objectMethod().toJson).to.be('{"id":null}');
  });

  it('::defClass', function() {
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
      .Class('Stub', function(){
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
      .Class('Stub', function(){
        id('id_stub');
      })

    expect(new Stub().__idValue__).to.be(null);
    expect(new Stub().toJson).to.be('{"id_stub":null}');
    expect(new Stub({id_stub: 1}).toJson).to.be('{"id_stub":1}');
  });

  it('foreingKey', function () {
    Xikitita
      .Class('Stub', function(){
      })
      .Class('Stub2', function(){
        belongsTo('stub', {foreingKey: 'id_stub'});
      })

    expect(new Stub2({id_stub: 1}).toJson).to.be('{"id":null,"id_stub":1}');
    expect(new Stub2({id_stub: 1}).stub).to.be.a(Stub);
  });

  it('referenceKey', function () {
    Xikitita
      .Class('Stub', function(){
        id('id_stub');
      })
      .Class('Stub2', function(){
        belongsTo('stub', {referenceKey: 'id_stub'});
      })

    expect(new Stub2({stub_id: 1}).toJson).to.be('{"id":null,"stub_id":1}');
    expect(new Stub2({stub_id: 1}).stub).to.be.a(Stub);
  });

  it('attrAccessible', function () {
    expect(new Customer().toJson).to.be('{"id":null,"name":null,"phone":null}');
  });

  it('::toTranslated.member', function () {
    expect(Customer.toTranslated.member).to.be('one customer');
    expect(User.toTranslated.member).to.be('one user');
    expect(Permission.toTranslated.member).to.be('one permission');
    expect(Stub.toTranslated.member).to.be('one stub');
  });

  it('::toTranslated.collection', function () {
    expect(Customer.toTranslated.collection).to.be('many customers');
    expect(User.toTranslated.collection).to.be('many users');
    expect(Permission.toTranslated.collection).to.be('many permissions');
    expect(Stub.toTranslated.collection).to.be('many stub');
  });

  it('#reset', function () {
    var customer = new Customer({name: 'Name', phone: '0000'});

    customer.name = null;
    customer.phone = null;
    customer.reset

    expect(customer.toJson).to.be('{"id":null,"name":"Name","phone":"0000"}');
  });

  it('#changes', function () {
    Xikitita
      .Class('Stub', function(){
        id('id_stub');

        attrAccessible('one', 'two')
      })

    var stub = new Stub();

    stub.one = 'One';
    stub.two = 'Two';

    expect(stub.changes.toJson).to.be('{"one":[null,"One"],"two":[null,"Two"]}');
    expect(stub.changes_id_stub.toJson).to.be('[]');
    expect(stub.changes_one.toJson).to.be('[null,"One"]');
    expect(stub.changes_two.toJson).to.be('[null,"Two"]');
  });

  it('#changed', function () {
    Xikitita
      .Class('Stub', function(){
        id('id_stub');

        attrAccessible('one', 'two')
      })

    var stub = new Stub();

    expect(stub.changed).to.be(false);
    expect(stub.changed_id_stub).to.be(false);
    expect(stub.changed_one).to.be(false);
    expect(stub.changed_two).to.be(false);

    stub.id_stub = 1;

    expect(stub.changed).to.be(true);
    expect(stub.changed_id_stub).to.be(true);
    expect(stub.changed_one).to.be(false);
    expect(stub.changed_two).to.be(false);
  });

});