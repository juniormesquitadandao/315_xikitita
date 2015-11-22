var expect = require('expect.js');
var EloquentJs = require('../../app/models/eloquent_js_model.js');
EloquentJs
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

describe('EloquentJs', function() {

  it('::models', function () {
    var modelNames = EloquentJs.models.map(function(model){
      return model.name;
    });

    expect(modelNames.join(', ')).to.be('Cliente, User, Permission, Stub');
  });

  describe('Model', function() {

    it('::name', function () {
      expect(Cliente.name).to.be('Cliente');
      expect(User.name).to.be('User');
      expect(Permission.name).to.be('Permission');
      expect(Stub.name).to.be('Stub');
    });


    it('#toJson', function () {
      expect(new Stub().toJson).to.be('{}');
    });

    it('attrAccessible', function () {
      expect(new Cliente().toJson).to.be('{"name":null,"phone":null}');
    });

    it('belongsTo', function () {
      expect(new User().toJson).to.be('{"email":null,"cliente":null,"permission":null}');
    });

    it('hasMany', function () {
      expect(new Permission().toJson).to.be('{"name":null,"clientes":[]}');
    });

  });

});