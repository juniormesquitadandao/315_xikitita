var expect = require('expect.js');
var EloquentJsModel = require('../../app/models/eloquent_js_model.js');

describe('EloquentJsModel', function() {

  it('create function to name', function () {
    EloquentJsModel('Model');

    expect(Model.name).to.be('Model');
  });

});