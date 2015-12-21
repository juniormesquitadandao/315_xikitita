var expect = require('expect.js');
var Xikitita = require('./xikitita.js');

describe('Validation', function() {
  
  before(function() {
    Xikitita
      .init
      .I18n('en', {
        errors:{
          format: '%{attribute} %{message}',
          messages: {
            accepted: 'must be accepted',
            blank: "can't be blank",
            present: 'must be blank',
            confirmation: "doesn't match %{attribute}",
            empty: "can't be empty",
            equal_to: 'must be equal to %{count}',
            even: 'must be even',
            exclusion: 'is reserved',
            greater_than: 'must be greater than %{count}',
            greater_than_or_equal_to: 'must be greater than or equal to %{count}',
            inclusion: 'is not included in the list',
            invalid: 'is invalid',
            less_than: 'must be less than %{count}',
            less_than_or_equal_to: 'must be less than or equal to %{count}',
            not_a_number: 'is not a number',
            not_an_integer: 'must be an integer',
            odd: 'must be odd',
            record_invalid: 'Validation failed: %{errors}',
            restrict_dependent_destroy: {
              one: 'Cannot delete record because a dependent %{record} exists',
              many: 'Cannot delete record because dependent %{record} exist',
            },
            taken: 'has already been taken',
            too_long: {
              one: 'is too long (maximum is 1 character)',
              other: 'is too long (maximum is %{count} characters)',
            },
            too_short:{
              one: 'is too short (minimum is 1 character)',
              other: 'is too short (minimum is %{count} characters)',
            },             
            wrong_length: {
              one: 'is the wrong length (should be 1 character)',
              other: 'is the wrong length (should be %{count} characters)',
            },
            other_than: 'must be other than %{count}'
          }
        }
      })
      .Model('Cliente', function(){
        attrAccessible('name', 'phone');

        validatesPresenceOf('name', 'phone');
      });      
  });
 
  it('#valid', function(){
    var cliente = new Cliente();

    expect(cliente.errors).to.be.a(Object);
    expect(cliente.isValid).to.be(false);
    expect(cliente.errors.toJson).to.be('{"name":["can\'t be blank"],"phone":["can\'t be blank"]}');

    cliente.name = 'Name';
    expect(cliente.isValid).to.be(false);
    expect(cliente.errors.toJson).to.be('{"phone":["can\'t be blank"]}');

    cliente.phone = '0000000';
    expect(cliente.isValid).to.be(true);
    expect(cliente.errors.toJson).to.be('{}');
  });

});