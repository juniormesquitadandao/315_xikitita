var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Model', function() {

  before(function() {
    Xikitita
      .init
      .Model('Customer', function(){
        attrAccessible('name', 'phone');
      })
      .Model('User', function(){
        attrAccessible('email');
        belongsTo('customer');
        belongsTo('permission');
      })
      .Model('Permission', function(){
        attrAccessible('name');
        hasMany('customers');
      })
      .Model('Stub', function(){
      });
  });

  it('belongsTo', function () {
    expect(new User().toJson).to.be('{"id":null,"email":null,"customer_id":null,"permission_id":null}');
    
    var user = new User({customer_id: 1});
    expect(user.toJson).to.be('{"id":null,"email":null,"customer_id":1,"permission_id":null}');

    user.customer = {id: 2, name: 'Name', phone: '00000000'};
    expect(user.toJson).to.be('{"id":null,"email":null,"customer_id":2,"permission_id":null}');
    expect(user.customer).to.be.a(Customer);

    user = new User('{"email":null,"customer_id":1,"permission_id":null}');  
    expect(user.toJson).to.be('{"id":null,"email":null,"customer_id":1,"permission_id":null}');
    expect(user.customer).to.be.a(Customer);
  });

  it('hasOne', function () {
    Xikitita
      .Model('Customer', function(){
        attrAccessible('name', 'phone');
        hasOne('user');
      })
    
    var customer = new Customer();
    expect(customer.toJson).to.be('{"id":null,"name":null,"phone":null}');
    expect(customer.user).to.be(null);

    customer.user = new User();
    expect(customer.user.toJson).to.be('{"id":null,"email":null,"customer_id":null,"permission_id":null}');
    expect(customer.user).to.be.a(User);

    customer.id = 1;
    expect(customer.user.toJson).to.be('{"id":null,"email":null,"customer_id":1,"permission_id":null}');

    customer.user = new User();
    expect(customer.user.toJson).to.be('{"id":null,"email":null,"customer_id":1,"permission_id":null}');
  });

  it('hasMany', function () {
    var permission = new Permission();
    expect(permission.toJson).to.be('{"id":null,"name":null}');
    expect(permission.customers).to.be(null);

    permission.customers = [new Customer()];
    expect(permission.customers.toJson).to.be('[{"id":null,"name":null,"phone":null,"permission_id":null}]');

    permission.id = 1;
    expect(permission.customers.toJson).to.be('[{"id":null,"name":null,"phone":null,"permission_id":1}]');

    permission.customers.push(new Customer({name: 'Name'}));
    expect(permission.customers.toJson).to.be('[{"id":null,"name":null,"phone":null,"permission_id":1},{"id":null,"name":"Name","phone":null,"permission_id":1}]');
  });

});