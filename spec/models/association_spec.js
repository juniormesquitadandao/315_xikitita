var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Model', function() {

  before(function() {
    Xikitita
      .init
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
    expect(cliente.user.toJson).to.be('{"id":null,"email":null,"cliente_id":1,"permission_id":null}');

    cliente.user = new User();
    expect(cliente.user.toJson).to.be('{"id":null,"email":null,"cliente_id":1,"permission_id":null}');
  });

  it('hasMany', function () {
    var permission = new Permission();
    expect(permission.toJson).to.be('{"id":null,"name":null}');
    expect(permission.clientes).to.be(null);

    permission.clientes = [new Cliente()];
    expect(permission.clientes.toJson).to.be('[{"id":null,"name":null,"phone":null,"permission_id":null}]');

    permission.id = 1;
    expect(permission.clientes.toJson).to.be('[{"id":null,"name":null,"phone":null,"permission_id":1}]');

    permission.clientes.push(new Cliente({name: 'Name'}));
    expect(permission.clientes.toJson).to.be('[{"id":null,"name":null,"phone":null,"permission_id":1},{"id":null,"name":"Name","phone":null,"permission_id":1}]');
  });

});