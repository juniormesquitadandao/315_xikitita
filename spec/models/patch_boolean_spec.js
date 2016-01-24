var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Patch Boolean', function() {

  before(function() {
    Xikitita
      .init
      .I18n('en', {
        logic: {
          formats: {
            default: {
              true: 'Yes',
              false: 'No'
            }
          }
        }
      })
      .I18n('pt-BR', {
        logic: {
          formats: {
            default: {
              true: 'Sim',
              false: 'Não'
            }
          }
        }
      });
  });

  it('#localize', function () {
    var logic = true;

    I18n.locale = 'en';

    expect(logic.localize()).to.be('Yes');

    I18n.locale = 'pt-BR';

    expect(logic.localize()).to.be('Sim');
  });

  it('#l', function () {
    var logic = true;

    I18n.locale = 'en';

    expect(logic.l()).to.be('Yes');

    I18n.locale = 'pt-BR';

    expect(logic.l()).to.be('Sim');
  });

});