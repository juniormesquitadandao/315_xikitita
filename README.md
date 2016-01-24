
##What's it?
Implementing some Active Record features in Javascript client side. Based on the ebook Eloquent Javascript 2nd edition and Rails Active Record
```js
Xikitita
  .init
  .Inflection(function(){
    irregular('singularWord', 'pluralWord');
  })
  //I18n: create as you like
  .I18n('locale', {
  })
  .I18n('otherLocale', {
  })
  //Validator: create as you like
  .Validator('CustomValidator', function(value, attrName, object, options){
  })
  //Class: create as you like
  .Class('ClassName', function(){
    belongsTo('otherClassName');
  })
  .Class('OtherClassName', function(){
    hasOne('className');
  });

var className = new ClassName();
var otherClassName = new OtherClassName();
I18n.translate('path.subPath');
I18n.localize(new Date());
'singularWord'.pluralize;
[].isEmpty;
{}.toJson;
'{}'.asJson;
'#{first} #{last}'.interpolate({first: 'First', last: 'Last'});
```
##Use cases
#####Customer
######Design
```yml
Custormer:
  id: attribute
  name: attribute, required
  lastName: attribute, required
  document: attribute, required
  street: attribute, minimum 8 characters, maximum 16 characters
  district: attribute, minimum 8 characters, maximum 16 characters
  phone: attribute, minimum 9 digits
  user: hasOne association, persisted
  fullName: object method, '#{name} #{lastName}'
  className: class method, class name 
```
######Implementation
```js
Xikitita
  .Class('Customer', function(){

    attrAccessor('name', 'lastName', 'document', 'street', 'district', 'phone');

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
      return '#{name} #{lastName}'.interpolate(object);
    });

    defClass('className', function(){
      return __class__.name;
    });

  });
```
######How to
```js
var customer = new Customer();
```
[more](https://github.com/juniormesquitadandao/xikitita/blob/v0.0/spec/models/xikitita_spec.js#L503-L594 "Mocha Test Case")
#####User
######Design
```yml
User:
  id: attribute
  email: attribute, required
  custormer_id: attribute
  persona_id: attribute, required
  customer: belongsTo association
  persona: belongsTo association
```
######Implementation
```js
Xikitita
  .Class('User', function(){

    attrAccessor('email');

    belongsTo('customer');
    belongsTo('persona');

    validatesPresenceOf('email', 'persona_id');

  });
```
######How to
```js
var user = new User();
```
[more](https://github.com/juniormesquitadandao/xikitita/blob/v0.0/spec/models/xikitita_spec.js#L596-L667 "Mocha Test Case")
#####Persona
######Design
```yml
Persona:
  id: attribute
  name: attribute, required
  users: hasMany association
```
######Implementation
```js
Xikitita
  .Class('Persona', function(){

    attrAccessor('name');

    hasMany('users');

    validatesPresenceOf('name');
  });
```
######How to
```js
var persona = new Persona();
```
[more](https://github.com/juniormesquitadandao/xikitita/blob/v0.0/spec/models/xikitita_spec.js#L669-L731 "Mocha Test Case")
##It works for you too?
#####Setting up internal communication of lib
You must set the number of flection of the names of their classes to the lib be able to relate members and collections.
```js
Xikitita
  .Inflection(function(){
    irregular('fish', 'fish');
    irregular('person', 'people');
  });
```
You can verifying calling the following methods on String objects:
```js
'person'.pluralize;
'people'.singularize;
```
#####Nationalizing the output to client
You must set the output data for each language supported by your application.
```js
Xikitita
      .I18n('en', {
        date: {
        },
        time: {
        },
        dateTime: {
        },
        integer: {
        },
        decimal: {
        },
        logic: {
        },
        errors: {
        }
      })
      .I18n('pt-BR', {
        date: {
        },
        time: {
        },
        dateTime: {
        },
        integer: {
        },
        decimal: {
        },
        logic: {
        },
        errors: {
        }
      });
```
######Nationalizing date
You can verifying calling the following methods on String objects:
```js
'person'.pluralize;
'people'.singularize;
```
