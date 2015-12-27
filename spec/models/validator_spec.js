var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Validator', function() {
  
  before(function() {
    Xikitita
      .init
      .Validator('Custom', function(value, attrName, object, options){
        return {
          success: value,
          fail: {
            messageName: 'custom',
            params: {
              custom: 'custom' 
            }
          }
        };
      });
  });

  it('::validators', function(){
    expect(Object.keys(Xikitita.validators).toJson).to.be('["presence","custom"]');
  });

  it('::validators.presence', function(){
    expect(Xikitita.validators.presence(null).toJson).to.be('{"success":false,"fail":{"messageName":"blank"}}');
    expect(Xikitita.validators.presence({}).toJson).to.be('{"success":false,"fail":{"messageName":"blank"}}');
    expect(Xikitita.validators.presence([]).toJson).to.be('{"success":false,"fail":{"messageName":"blank"}}');
    expect(Xikitita.validators.presence('').toJson).to.be('{"success":false,"fail":{"messageName":"blank"}}');

    expect(Xikitita.validators.presence(0).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xikitita.validators.presence({0: ''}).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xikitita.validators.presence([0]).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xikitita.validators.presence('0').toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xikitita.validators.presence(true).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xikitita.validators.presence(false).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
  });

  it('::validators.custom', function(){
    expect(Xikitita.validators.custom(false).toJson).to.be('{"success":false,"fail":{"messageName":"custom","params":{"custom":"custom"}}}');
    expect(Xikitita.validators.custom(true).toJson).to.be('{"success":true,"fail":{"messageName":"custom","params":{"custom":"custom"}}}');
  });

});