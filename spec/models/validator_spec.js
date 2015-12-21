var expect = require('expect.js');
var Xikitita = require('./xikitita.js');

describe('Validator', function() {
  
  before(function() {
    Xikitita
      .init
      .Validator('custom', 'customKey', function(value, attrName, instance, options){
        return value;
      })
  });

  it('::validators', function(){
    expect(Object.keys(Xikitita.validators).toJson).to.be('["presence","custom"]');
  });

  it('::validators.presence', function(){
    expect(Xikitita.validators.presence.call(null)).to.be(false);
    expect(Xikitita.validators.presence.call({})).to.be(true);
  });

  it('::validators.custom', function(){
    expect(Xikitita.validators.custom.call(false)).to.be(false);
    expect(Xikitita.validators.custom.call(true)).to.be(true);
  });

});