var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');

describe('Inflection', function() {
  
  before(function() {
    Xikitita
      .init
      .Inflection(function(){
        irregular('fish', 'fish');
      });
  });

  it('#irregular', function () {
    expect('fish'.pluralize).to.be('fish');
    expect('fish'.singularize).to.be('fish');
  });
  
});