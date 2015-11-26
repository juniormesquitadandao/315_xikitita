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
        .Model('Stub2', function(){
          belongsTo('stub', {foreingKey: 'id_stub', primaryKey: 'id_stub'});
        })

      expect(new Stub2({id_stub: 1}).toJson).to.be('{"id":null,"id_stub":1}');
      expect(new Stub2({id_stub: 1}).stub).to.be.a(Stub);
    });

    it('attrAccessible', function () {
      expect(new Cliente().toJson).to.be('{"id":null,"name":null,"phone":null}');
    });

    it('belongsTo', function () {
      expect(new User().toJson).to.be('{"id":null,"email":null,"cliente_id":null,"permission_id":null}');
      
      var user = new User({cliente_id: 1});
      expect(user.toJson).to.be('{"id":null,"email":null,"cliente_id":1,"permission_id":null}');

      user.cliente = {id: 2, name: 'Name', phone: '00000000'};
      expect(user.toJson).to.be('{"id":null,"email":null,"cliente_id":2,"permission_id":null}');
      expect(user.cliente).to.be.a(Cliente);

      user = new User('{"email":null,"cliente_id":1,"permission_id":null}');  
      expect(user.toJson).to.be('{"id":null,"email":null,"cliente_id":1,"permission_id":null}');
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
      
      var cliente = new Cliente();
      expect(cliente.toJson).to.be('{"id":null,"name":null,"phone":null}');
      expect(cliente.user).to.be(null);

      cliente.user = new User();
      expect(cliente.user.toJson).to.be('{"id":null,"email":null,"cliente_id":null,"permission_id":null}');
      expect(cliente.user).to.be.a(User);

      cliente.id = 1;
      cliente.user = new User();
      expect(cliente.user.toJson).to.be('{"id":null,"email":null,"cliente_id":1,"permission_id":null}');
    });

  });

});