var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');

describe('Validation', function() {
  before(function() {
    Xikitita
      .init
  });

  it('::validators', function(){
    expect(Object.keys(Xikitita.validators).toJson).to.be('["presence"]');
  });

  it('::validators.presence', function(){
    expect(Xikitita.validators.presence(null)).to.be(false);
    expect(Xikitita.validators.presence({})).to.be(true);
  });

});