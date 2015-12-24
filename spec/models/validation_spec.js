var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Validation', function() {
  
  before(function() {
    Xikitita
      .init
      .I18n('en', {
        errors:{
          messages: {
            blank: "can't be blank"
          }
        }
      })
      .Model('Customer', function(){
        attrAccessible('name', 'phone');

        validatesPresenceOf('name', 'phone');
      });      
  });
 
  it('#valid', function(){
    var customer = new Customer();

    expect(customer.errors).to.be.a(Object);
    expect(customer.isValid).to.be(false);
    expect(customer.errors.toJson).to.be('{"name":["can\'t be blank"],"phone":["can\'t be blank"]}');

    customer.name = 'Name';
    expect(customer.isValid).to.be(false);
    expect(customer.errors.toJson).to.be('{"phone":["can\'t be blank"]}');

    customer.phone = '0000000';
    expect(customer.isValid).to.be(true);
    expect(customer.errors.toJson).to.be('{}');
  });

});