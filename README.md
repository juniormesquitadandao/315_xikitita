# Xikitita
Xikitita

```shell
npm init

npm install --save-dev mocha

npm install --save-dev expect

npm install --save-dev expect.js

npm test spec

npm test spec/models

npm test spec debug
```

```javascript
XikititaValidate('Length', function(){
  
  expect(function(expected){
    return XikititaReflection.send(expected.type, expects);
  });

  parametersMessage(function(expected){
    return {value: expected.options.value};
  })

  var expects = {
    max: function(expected){
      return expected.instance.send(expected.attribute).length > expected.value;
    },
    min: function(expected){
      return expected.instance.send(expected.attribute).length < expected.value;
    }
  }

});

XikititaValidate('Uniquiness', function(){
  
  expect(function(expected){
    return expected.instance.all.search(function(i){ i.send(expected.attribute) === expected.value ).length > 1;
  });

});


XikititaModel('Role', function(){

  id('code');

  attributes('name');
  
  hasMany('users');

  validates('name', {presence: true, uniquiness: true});

  classMethod('all', function(user){

  });

});

XikititaModel('User', function(){

  attributes('email', 'password');
  
  belongsTo('role');

  validatesPresenceOf('email', 'password', 'role');

  validate(function(instance){
    if(instance.confirm_password && instance.password != instance.confirm_password){
      erros.add('confirm_password', 'invalid');
    }
  });

  instanceMethod('full', function(user){

  });

  classMethod('full', function(user){

  });

});

user = new User({id: 9, email: 'user@email.com', role: { code: 10, name: 'Admin' }});
user.user_id
user.valid
user.errors
user.errors.email
user.errors.full_messages
user.changes
user.restore
user.role;
user.role.id;
user.role.valid;
user.role.users;
user.full();
User.full();
```
