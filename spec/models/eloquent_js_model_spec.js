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

    it('#new', function () {
      expect(Stub).withArgs({two: 'value'}).to.throwException(function (exception) {
        expect(exception).to.be.a(TypeError);
        expect(exception.message).to.be('stub.two is not a attribute');
      })

      EloquentJs
        .Model('Stub', function(){
          attrAccessible('one', 'two');
        })

      expect(new Stub().toJson).to.be('{"one":null,"two":null}');
      expect(new Stub({}).toJson).to.be('{"one":null,"two":null}');
      expect(new Stub('{}').toJson).to.be('{"one":null,"two":null}');

      expect(new Stub({one: 'value'}).toJson).to.be('{"one":"value","two":null}');
      expect(new Stub({'one': 0}).toJson).to.be('{"one":0,"two":null}');

      expect(new Stub('{"one": "value"}').toJson).to.be('{"one":"value","two":null}');
      expect(new Stub('{"one": 0}').toJson).to.be('{"one":0,"two":null}');
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

    it('hasOne', function () {
      EloquentJs
        .Model('Cliente', function(){
          attrAccessible('name', 'phone');
          hasOne('user');
        })
      
      expect(new Cliente().toJson).to.be('{"name":null,"phone":null,"user":null}');
    });

  });

});