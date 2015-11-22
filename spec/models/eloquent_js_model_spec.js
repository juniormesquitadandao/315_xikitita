var expect = require('expect.js');
var EloquentJs = require('../../app/models/eloquent_js_model.js');
EloquentJs
  .Model('User')
  .Model('Cliente');

describe('EloquentJs', function() {

  describe('Model', function() {

    it('create', function () {
      expect(User.name).to.be('User');
      expect(Cliente.name).to.be('Cliente');
    });

    it('save', function () {
      var modelNames = EloquentJs.models.map(function(model){
        return model.name;
      });

      expect(modelNames.join(', ')).to.be('User, Cliente');
    });

  });

});