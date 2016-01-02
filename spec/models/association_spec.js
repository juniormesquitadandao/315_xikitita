var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Association', function() {

  before(function() {
    Xikitita
      .init
      .Class('Customer', function(){
        attrAccessible('name', 'phone');
      })
      .Class('User', function(){
        attrAccessible('email');
        belongsTo('customer');
        belongsTo('permission');
      })
      .Class('Permission', function(){
        attrAccessible('name');
        hasMany('customers');
      })
      .Class('Stub', function(){
      });
  });

  it('belongsTo', function () {
    var user = new User({customer_id: 1});
    expect(user.toJson).to.be('{"id":null,"email":null,"customer_id":1,"permission_id":null}');
    expect(user.customer.toJson).to.be('{"id":1,"name":null,"phone":null}');
    expect(user.customer).to.be.a(Customer);

    var user = new User({customer: {id: 1} });
    expect(user.toJson).to.be('{"id":null,"email":null,"customer_id":1,"permission_id":null}');
    expect(user.customer.toJson).to.be('{"id":1,"name":null,"phone":null}');
    expect(user.customer).to.be.a(Customer);

    var user = new User();
    expect(user.toJson).to.be('{"id":null,"email":null,"customer_id":null,"permission_id":null}');
    expect(user.customer).to.be(null);

    user.customer = {id: 2, name: 'Name', phone: '00000000'};
    expect(user.toJson).to.be('{"id":null,"email":null,"customer_id":2,"permission_id":null}');
    expect(user.customer.toJson).to.be('{"id":2,"name":"Name","phone":"00000000"}');
    expect(user.customer).to.be.a(Customer);

    user = new User('{"email":null,"customer_id":1,"permission_id":null}');  
    expect(user.toJson).to.be('{"id":null,"email":null,"customer_id":1,"permission_id":null}');
    expect(user.customer.toJson).to.be('{"id":1,"name":null,"phone":null}');
    expect(user.customer).to.be.a(Customer);
  });

  it('hasOne', function () {
    Xikitita
      .Class('Customer', function(){
        attrAccessible('name', 'phone');
        hasOne('user');
      })
    
    var customer = new Customer();
    expect(customer.toJson).to.be('{"id":null,"name":null,"phone":null}');
    expect(customer.user).to.be(null);

    customer.user = new User();
    expect(customer.user.toJson).to.be('{"id":null,"email":null,"customer_id":null,"permission_id":null}');
    expect(customer.user).to.be.a(User);
    expect(customer.user.customer).to.be(null);
    expect(customer.user.permission).to.be(null);

    customer.id = 1;
    expect(customer.user.toJson).to.be('{"id":null,"email":null,"customer_id":1,"permission_id":null}');
    expect(customer.user).to.be.a(User);
    expect(customer.user.customer).to.be(null);
    expect(customer.user.permission).to.be(null);

    customer.user = new User();
    expect(customer.user.toJson).to.be('{"id":null,"email":null,"customer_id":1,"permission_id":null}');
    expect(customer.user).to.be.a(User);
    expect(customer.user.customer).to.be(null);
    expect(customer.user.permission).to.be(null);

    var customer = new Customer({name: 'Name', user: {}});
    expect(customer.toJson).to.be('{"id":null,"name":"Name","phone":null}');
    expect(customer.user.toJson).to.be('{"id":null,"email":null,"customer_id":null,"permission_id":null}');
    expect(customer.user.customer.toJson).to.be('{"id":null,"name":null,"phone":null}');
    expect(customer.user.permission).to.be(null);

    var customer = new Customer({name: 'Name', user: {permission_id: null}});
    expect(customer.toJson).to.be('{"id":null,"name":"Name","phone":null}');
    expect(customer.user.toJson).to.be('{"id":null,"email":null,"customer_id":null,"permission_id":null}');
    expect(customer.user.customer.toJson).to.be('{"id":null,"name":null,"phone":null}');
    expect(customer.user.permission.toJson).to.be('{"id":null,"name":null}');
  });

  it('hasMany', function () {
    var permission = new Permission();
    expect(permission.toJson).to.be('{"id":null,"name":null}');
    expect(permission.customers.toJson).to.be('[]');

    permission.customers = [new Customer()];
    expect(permission.customers.toJson).to.be('[{"id":null,"name":null,"phone":null,"permission_id":null}]');

    permission.id = 1;
    expect(permission.customers.toJson).to.be('[{"id":null,"name":null,"phone":null,"permission_id":1}]');

    permission.customers.push(new Customer({name: 'Name'}));
    expect(permission.customers.toJson).to.be('[{"id":null,"name":null,"phone":null,"permission_id":1},{"id":null,"name":"Name","phone":null,"permission_id":1}]');
  });

});