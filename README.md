# Eloquent Js Model
Eloquent Js Model

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
EloquentJs
  .Model('Cliente', function(){
    attrAccessible('name', 'phone');
  })
  .Model('User', function(){
    attrAccessible('email');
    belongsTo('cliente');
    belongsTo('permission');
  })
  .Model('Permission', function(){
    attrAccessible('name');
    hasMany('clientes');
  })
  .Model('Stub', function(){
  });
```
