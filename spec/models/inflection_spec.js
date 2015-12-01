var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');


describe('Inflection', function() {
  before(function() {
    Xikitita
      .Inflection(function(){
        irregular('fish', 'fish');
      });
  });

  describe('String', function() {
    
    it('#pluralize', function () {
      expect('user'.pluralize).to.be('users');
      expect('fish'.pluralize).to.be('fish');
    });

    it('#singularize', function () {
      expect('users'.singularize).to.be('user');
      expect('fish'.singularize).to.be('fish');
    });
  
  });

});