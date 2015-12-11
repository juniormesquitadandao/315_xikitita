var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');

describe('Validator', function() {
  before(function() {
    Xikitita
      .init
      .Validator('custom', function(value, attrName, instance, options){
        return value;
      })
  });

  it('::validators', function(){
    expect(Object.keys(Xikitita.validators).toJson).to.be('["presence","custom"]');
  });

  it('::validators.presence', function(){
    expect(Xikitita.validators.presence(null)).to.be(false);
    expect(Xikitita.validators.presence({})).to.be(true);
  });

  it('::validators.custom', function(){
    expect(Xikitita.validators.custom(false)).to.be(false);
    expect(Xikitita.validators.custom(true)).to.be(true);
  });

});