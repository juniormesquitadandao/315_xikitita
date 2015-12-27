# Xikitita (EloquentJs + Rails Active Record)
Implementing some Active Record features  in Javascript client side:
######Customer
#######Design
```yml
Custormer:
  name: attribute, required
  lastName: attribute, required
  document: attribute, required
  street: attribute, minimum 8, maximum 16
  district: attribute, minimum 8, maximum 16
  phone: attribute, minimum 9
  user: hasOne
  fullName: object method
  className: class method 
```
#######Implementation
```javascript
Xikitita
  .Class('Customer', function(){

    attrAccessible('name', 'lastName', 'document', 'street', 'district', 'phone');

    hasOne('user');

    validatesPresenceOf('name', 'lastName');
    validates('document', {
      presence: true
    });
    validatesLengthOf('street', 'district', {
      in: [8, 16],
      allowNull: true}
    );
    validates('phone', { 
      presence: true,
      length: {
        minimum: 9
      }
    });
    validate('user', function(){
      return {
        success: object.user && typeof object.user.id === 'number',
        fail: {
          messageName: 'newRecord'
        }
      };
    });

    def('fullName', function(){
      return [object.name, object.lastName].join(' ');
    });

    defClass('className', function(){
      return __class__.name;
    });

  });
```
#######How to
```javascript
var customer = new Customer();
console.log(customer.toJson)
('{"id":null,"name":null,"lastName":null,"document":null,"street":null,"district":null,"phone":null}');
console.log(customer.isValid)
(false);
console.log(customer.errors.toJson)
('{"name":["can\'t be blank"],"lastName":["can\'t be blank"],"document":["can\'t be blank"],"phone":["can\'t be blank","is too short (minimum is 9 characters)"],"user":["can\'t be new record"]}');

customer = new Customer({name: '', lastName: '', document: '', street: '', district: '', phone: ''});
console.log(customer.isValid)
(false);
console.log(customer.errors.toJson)
('{"name":["can\'t be blank"],"lastName":["can\'t be blank"],"document":["can\'t be blank"],"street":["is too short (minimum is 8 characters)"],"district":["is too short (minimum is 8 characters)"],"phone":["can\'t be blank","is too short (minimum is 9 characters)"],"user":["can\'t be new record"]}');

customer = new Customer({name: 'Name', lastName: 'Last Name', document: '000000000000000'});
console.log(customer.isValid)
(false);
console.log(customer.errors.toJson)
('{"phone":["can\'t be blank","is too short (minimum is 9 characters)"],"user":["can\'t be new record"]}');
customer.phone = '0';
console.log(customer.isValid)
(false);
console.log(customer.errors.toJson)
('{"phone":["is too short (minimum is 9 characters)"],"user":["can\'t be new record"]}');
customer.phone = '000000000';
customer.street = 'xxxxxxxxxxxxxxxxx';
customer.district = 'xxxxxxxxxxxxxxxxx';
console.log(customer.isValid)
(false);
console.log(customer.errors.toJson)
('{"street":["is too long (maximum is 16 characters)"],"district":["is too long (maximum is 16 characters)"],"user":["can\'t be new record"]}');

customer = new Customer('{"name": "Name", "lastName": "lastName", "document": "0", "street": "xxxxxxxx", "district": "xxxxxxxx", "phone": "000000000"}');
console.log(customer.isValid)
(false);
console.log(customer.errors.toJson)
('{"user":["can\'t be new record"]}');

customer.user = {id: 0};
console.log(customer.isValid)
(true);
console.log(customer.errors.toJson)
('{}');
console.log(customer.toJson)
('{"id":null,"name":"Name","lastName":"lastName","document":"0","street":"xxxxxxxx","district":"xxxxxxxx","phone":"000000000"}');
console.log(customer.user.toJson)
('{"id":0,"customer_id":null}');
console.log(customer.user.customer.toJson)
('{"id":null,"name":null,"lastName":null,"document":null,"street":null,"district":null,"phone":null}');

customer.id = 0;
console.log(customer.toJson)
('{"id":0,"name":"Name","lastName":"lastName","document":"0","street":"xxxxxxxx","district":"xxxxxxxx","phone":"000000000"}');
console.log(customer.user.toJson)
('{"id":0,"customer_id":0}');
console.log(customer.user.customer.toJson)
('{"id":null,"name":null,"lastName":null,"document":null,"street":null,"district":null,"phone":null}');

console.log(customer.fullName())
('Name lastName');
console.log(customer.className)
(undefined);
console.log(Customer.fullName)
(undefined);
console.log(Customer.className())
('Customer');
```
