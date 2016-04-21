var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Validation', function() {

  before(function() {
    Xikitita
      .init
      .I18n('en', {
        errors:{
          messages: {
            blank: 'can\'t be blank',
            diff: 'can\'t be diff (%{first} !== %{last})'
          }
        },
        classes:{
          customer:{
            attributes:{
              name: 'Name',
              phone: 'Phone'
            }
          }
        }
      })
      .Class('Customer', function(){
        attrAccessor('name', 'phone');

        validatesPresenceOf('name');
        validates('phone', {presence: true});
        validate('base', function(){
          return {
            success: object.name === object.phone,
            fail: {
              messageName: 'diff',
              params: {
                first: object.toHuman.name,
                last: object.toHuman.phone
              }
            }
          };
        });
      });
  });

  it('#valid', function(){
    var customer = new Customer();

    expect(customer.errors).to.be.a(Object);
    expect(customer.isValid).to.be(false);
    expect(customer.errors.toJson).to.be('{"name":["can\'t be blank"],"phone":["can\'t be blank"]}');

    expect(customer.errors.toJson).to.be('{"name":["can\'t be blank"],"phone":["can\'t be blank"]}');

    customer.name = 'Name';
    expect(customer.isValid).to.be(false);
    expect(customer.errors.toJson).to.be('{"phone":["can\'t be blank"],"base":["can\'t be diff (Name !== Phone)"]}');

    customer.phone = '0000000';
    expect(customer.isValid).to.be(false);
    expect(customer.errors.toJson).to.be('{"base":["can\'t be diff (Name !== Phone)"]}');
  });

});