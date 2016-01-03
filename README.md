
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
'#{first} #{last}'.interpolation({first: 'First', last: 'Last'});
```
#####Customer
######Design
```yml
Custormer:
  name: attribute, required
  lastName: attribute, required
  document: attribute, required
  street: attribute, minimum 8 characters, maximum 16 characters
  district: attribute, minimum 8 characters, maximum 16 characters
  phone: attribute, minimum 9 digits
  user: hasOne, persisted
  fullName: object method, '#{name} #{lastName}'
  className: class method, class name 
```
######Implementation
```js
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
