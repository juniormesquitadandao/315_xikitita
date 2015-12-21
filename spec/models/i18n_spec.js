var expect = require('expect.js');
var Xikitita = require('./xikitita.js');

describe('I18n', function() {

  before(function() {
    Xikitita
      .init
      .I18n('en', {
        date: {
          default: function(value){
            return '2015-01-01';
          }, 
          year: function(value){
            return '2015';
          } 
        },  
        integer: {
          default: function(value){
            return '9,999,999';
          }, 
          cliente: function(value){
            return '9,999,999 Clientes';
          } 
        },  
        decimal: {
          default: function(value){
            return '999.99';
          }, 
          currency: function(value){
            return '$ 999.99';
          }
        },  
        logical: {
          default: function(value){
            return 'yes';
          }, 
          up: function(value){
            return 'YES';
          }
        },  
        parent: {
          child: 'message #{name}'   
        }
      })
      .I18n('en-US', {
        date: {
          default: function(value){
            return '2015 01 01';
          }, 
          year: function(value){
            return 'Year 2015';
          } 
        },  
        integer: {
          default: function(value){
            return '9 999 999';
          }, 
          cliente: function(value){
            return 'Clientes 9 999 999';
          } 
        },  
        decimal: {
          default: function(value){
            return '999.99 USD';
          }, 
          currency: function(value){
            return '$ 999.99 USD';
          }
        },  
        logical: {
          default: function(value){
            return 'yes USD';
          }, 
          up: function(value){
            return 'YES USD';
          }
        },  
        parent: {
          child: '#{name} message'   
        }
      });
  });

  it('#locale', function () {
    expect(I18n.locale).to.be('en');

    I18n.locale = 'en-US';
    expect(I18n.locale).to.be('en-US');
  });

  it('#t', function () {
    I18n.locale = 'en';

    expect(I18n.t('parent')).to.be('parent');
    expect(I18n.t('parent.child')).to.be('message #{name}');
    expect(I18n.t('parent.child', {name: 'Name'})).to.be('message Name');

    I18n.locale = 'en-US';

    expect(I18n.t('parent')).to.be('parent');
    expect(I18n.t('parent.child')).to.be('#{name} message');
    expect(I18n.t('parent.child', {name: 'Name'})).to.be('Name message');
  });

  it('#l', function () {
    var date = new Date('01-01-2015');
    var integer = 9999999;
    var decimal = 999.99;
    var logical = true;

    I18n.locale = 'en';

    expect(I18n.l(date)).to.be('2015-01-01');
    expect(I18n.l(date, 'year')).to.be('2015');
    expect(I18n.l(integer)).to.be('9,999,999');
    expect(I18n.l(integer, 'cliente')).to.be('9,999,999 Clientes');
    expect(I18n.l(decimal)).to.be('999.99');
    expect(I18n.l(decimal, 'currency')).to.be('$ 999.99');
    expect(I18n.l(logical)).to.be('yes');
    expect(I18n.l(logical, 'up')).to.be('YES');

    I18n.locale = 'en-US';

    expect(I18n.l(date)).to.be('2015 01 01');
    expect(I18n.l(date, 'year')).to.be('Year 2015');
    expect(I18n.l(integer)).to.be('9 999 999');
    expect(I18n.l(integer, 'cliente')).to.be('Clientes 9 999 999');
    expect(I18n.l(decimal)).to.be('999.99 USD');
    expect(I18n.l(decimal, 'currency')).to.be('$ 999.99 USD');
    expect(I18n.l(logical)).to.be('yes USD');
    expect(I18n.l(logical, 'up')).to.be('YES USD');
  });

});