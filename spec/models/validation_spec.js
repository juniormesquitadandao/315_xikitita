var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');

describe('Validation', function() {
  before(function() {
    Xikitita
      .init
      .Model('Cliente', function(){
        attrAccessible('name', 'phone');

        validatesPresenceOf('name', 'phone');
      })
  });


  it('::validators', function(){
    expect(Object.keys(Xikitita.validators).toJson).to.be('["presence"]');
  });

  it('::validators.presence', function(){
    expect(Xikitita.validators.presence(null)).to.be(false);
    expect(Xikitita.validators.presence({})).to.be(true);
  });

  it('#valid', function(){
    var cliente = new Cliente();

    expect(cliente.errors).to.be('{}');
    expect(cliente.isValid).to.be(false);
    expect(cliente.errors).to.be('{"name":["não pode ficar em branco"],\
      "phone":["não pode ficar em branco"]}');

    cliente.name = 'Name';
    expect(cliente.isValid).to.be(false);
    expect(cliente.errors).to.be('"phone":["não pode ficar em branco"]}');

    cliente.phone = '0000000';
    expect(cliente.isValid).to.be(true);
    expect(cliente.errors).to.be('{}');
  });

});