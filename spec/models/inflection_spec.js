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

  describe('String', function() {
    
    it('#pluralize', function () {
      expect('fish'.pluralize).to.be('fish');
    });

    it('#singularize', function () {
      expect('fish'.singularize).to.be('fish');
    });
  
  });

});