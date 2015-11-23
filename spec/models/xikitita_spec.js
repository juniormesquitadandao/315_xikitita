var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');
Xikitita
  .Model('Cliente', function(){
    attrAccessible('name', 'phone');
  })
  .Model('User', function(){
    attrAccessible('email');
    belongsTo('cliente');
    belongsTo('permission');
  })
  .Model('Permission', function(){
    attrAccessible('name');
    hasMany('clientes');
  })
  .Model('Stub', function(){
  });

describe('Xikitita', function() {

  it('::models', function () {
    var modelNames = Object.keys(Xikitita.models).join(', ');

    expect(modelNames).to.be('Cliente, User, Permission, Stub');
  });

  describe('Model', function() {

    it('::name', function () {
      expect(Cliente.name).to.be('Cliente');
      expect(User.name).to.be('User');
      expect(Permission.name).to.be('Permission');
      expect(Stub.name).to.be('Stub');
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


    it('id', function () {
      Xikitita
        .Model('Stub', function(){
          id('id_stub');
        })

      expect(new Stub().toJson).to.be('{"id_stub":null}');
    });

    it('attrAccessible', function () {
      expect(new Cliente().toJson).to.be('{"id":null,"name":null,"phone":null}');
    });

    it('belongsTo', function () {
      expect(new User().toJson).to.be('{"id":null,"email":null,"cliente":null,"permission":null}');
      
      var user = new User({cliente: {name: 'Name', phone: '00000000'}});  
      expect(user.toJson).to.be('{"id":null,"email":null,"cliente":{"id":null,"name":"Name","phone":"00000000"},"permission":null}');
      expect(user.cliente).to.be.a(Cliente);

      user = new User({cliente: user.cliente});  
      expect(user.toJson).to.be('{"id":null,"email":null,"cliente":{"id":null,"name":"Name","phone":"00000000"},"permission":null}');
      expect(user.cliente).to.be.a(Cliente);

      user = new User('{"email":null,"cliente":{"id":null,"name":"Name","phone":"00000000"},"permission":null}');  
      expect(user.toJson).to.be('{"id":null,"email":null,"cliente":{"id":null,"name":"Name","phone":"00000000"},"permission":null}');
      expect(user.cliente).to.be.a(Cliente);
    });

    it('hasMany', function () {
      expect(new Permission().toJson).to.be('{"id":null,"name":null,"clientes":[]}');
    });

    it('hasOne', function () {
      Xikitita
        .Model('Cliente', function(){
          attrAccessible('name', 'phone');
          hasOne('user');
        })
      
      expect(new Cliente().toJson).to.be('{"id":null,"name":null,"phone":null,"user":null}');
    });

  });

});