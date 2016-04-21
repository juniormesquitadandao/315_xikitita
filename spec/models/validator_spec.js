var expect = require('expect.js');
var Xktta = require('../../temp/xktta.js');

describe('Validator', function() {

  before(function() {
    Xktta
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
    expect(Object.keys(Xktta.validators).toJson).to.be('["presence","length","custom"]');
  });

  it('::validators.presence', function(){
    expect(Xktta.validators.presence(null).toJson).to.be('{"success":false,"fail":{"messageName":"blank"}}');
    expect(Xktta.validators.presence({}).toJson).to.be('{"success":false,"fail":{"messageName":"blank"}}');
    expect(Xktta.validators.presence([]).toJson).to.be('{"success":false,"fail":{"messageName":"blank"}}');
    expect(Xktta.validators.presence('').toJson).to.be('{"success":false,"fail":{"messageName":"blank"}}');

    expect(Xktta.validators.presence(0).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xktta.validators.presence({0: ''}).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xktta.validators.presence([0]).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xktta.validators.presence('0').toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xktta.validators.presence(true).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
    expect(Xktta.validators.presence(false).toJson).to.be('{"success":true,"fail":{"messageName":"blank"}}');
  });

  it('::validators.custom', function(){
    expect(Xktta.validators.custom(false).toJson).to.be('{"success":false,"fail":{"messageName":"custom","params":{"custom":"custom"}}}');
    expect(Xktta.validators.custom(true).toJson).to.be('{"success":true,"fail":{"messageName":"custom","params":{"custom":"custom"}}}');
  });

});