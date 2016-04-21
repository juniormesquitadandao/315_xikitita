var expect = require('expect.js');
var Xktta = require('../../temp/xktta.js');

describe('Patch Number', function() {

  before(function() {
    Xktta
      .init
      .I18n('en', {
        integer: {
          formats: {
            default: function(value){
              return '9,999,999';
            }
          }
        },
        decimal: {
          formats: {
            default: function(value){
              return '9,999,999.99';
            }
          }
        }
      })
      .I18n('pt-BR', {
        integer: {
          formats: {
            default: function(value){
              return '9.999.999';
            }
          }
        },
        decimal: {
          formats: {
            default: function(value){
              return '9.999.999,99';
            }
          }
        }
      });
  });

  it('#localize', function () {
    var integer = 9999999;
    var decimal = 9999999.99;

    I18n.locale = 'en';

    expect(integer.localize()).to.be('9,999,999');
    expect(decimal.localize()).to.be('9,999,999.99');

    I18n.locale = 'pt-BR';

    expect(integer.localize()).to.be('9.999.999');
    expect(decimal.localize()).to.be('9.999.999,99');
  });

  it('#l', function () {
    var integer = 9999999;
    var decimal = 9999999.99;

    I18n.locale = 'en';

    expect(integer.l()).to.be('9,999,999');
    expect(decimal.l()).to.be('9,999,999.99');

    I18n.locale = 'pt-BR';

    expect(integer.l()).to.be('9.999.999');
    expect(decimal.l()).to.be('9.999.999,99');
  });

});