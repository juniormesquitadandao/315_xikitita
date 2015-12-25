var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Validator', function() {
  
  before(function() {
    Xikitita
      .init
      .Inflection(function(){
        irregular('fish', 'fish');
        irregular('person', 'people');
      })
  });

  it('Inflection', function(){
    expect('customer'.pluralize).to.be('customers');
    expect('user'.pluralize).to.be('users');
    expect('permission'.pluralize).to.be('permissions');
    expect('fish'.pluralize).to.be('fish');
    expect('person'.pluralize).to.be('people');

    expect('customers'.singularize).to.be('customer');
    expect('users'.singularize).to.be('user');
    expect('permissions'.singularize).to.be('permission');
    expect('fish'.singularize).to.be('fish');
    expect('people'.singularize).to.be('person');
  });

});