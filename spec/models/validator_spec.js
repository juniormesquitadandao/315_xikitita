var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Validator', function() {
  
  before(function() {
    Xikitita
      .init
      .Validator('Custom', function(value, attrName, object, options){
        return {
          success: value,
          failMessageName: 'custom'
        };
      });
  });

  it('::validators', function(){
    expect(Object.keys(Xikitita.validators).toJson).to.be('["presence","custom"]');
  });

  it('::validators.presence', function(){
    expect(Xikitita.validators.presence(null).toJson).to.be('{"success":false,"failMessageName":"blank"}');
    expect(Xikitita.validators.presence({}).toJson).to.be('{"success":true,"failMessageName":"blank"}');
  });

  it('::validators.custom', function(){
    expect(Xikitita.validators.custom(false).toJson).to.be('{"success":false,"failMessageName":"custom"}');
    expect(Xikitita.validators.custom(true).toJson).to.be('{"success":true,"failMessageName":"custom"}');
  });

});