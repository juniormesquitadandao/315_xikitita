var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Patch Integer', function() {

  before(function() {
    Xikitita
      .init
      .I18n('en', {
        integer: {
          formats: {
            default: function(value){
              return '9,999,999';
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
        }
      });
  });

  it('#localize', function () {
    var integer = 9999999;

    I18n.locale = 'en';

    expect(integer.localize()).to.be('9,999,999');

    I18n.locale = 'pt-BR';

    expect(integer.localize()).to.be('9.999.999');
  });

  it('#l', function () {
    var integer = 9999999;

    I18n.locale = 'en';

    expect(integer.localize()).to.be('9,999,999');

    I18n.locale = 'pt-BR';

    expect(integer.localize()).to.be('9.999.999');
  });

});