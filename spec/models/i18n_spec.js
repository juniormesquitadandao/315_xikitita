var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

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
          customer: function(value){
            return '9,999,999 Customers';
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
        logic: {
          default: function(value){
            return 'yes';
          }, 
          up: function(value){
            return 'YES';
          }
        },  
        parentPath: {
          childPath: 'message #{name}'   
        }
      })
      .I18n('en-US', {
        date: {
          default: function(value){
            return '2015 01 01';
          }, 
          year: function(value){
            return '2015 YEAR';
          } 
        },  
        integer: {
          default: function(value){
            return '9 999 999';
          }, 
          customer: function(value){
            return '9 999 999 Customers';
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
        logic: {
          default: function(value){
            return 'yes USD';
          }, 
          up: function(value){
            return 'YES USD';
          }
        },  
        parentPath: {
          childPath: '#{name} message'   
        }
      });
  });

  it('#locale', function () {
    expect(I18n.locale).to.be('en');

    I18n.locale = 'en-US';
    expect(I18n.locale).to.be('en-US');
  });

  it('#translate', function () {
    I18n.locale = 'en';

    expect(I18n.translate('parentPath')).to.be('parentPath');
    expect(I18n.translate('parentPath.childPath')).to.be('message #{name}');
    expect(I18n.translate('parentPath.childPath', {name: 'Name'})).to.be('message Name');

    I18n.locale = 'en-US';

    expect(I18n.translate('parentPath')).to.be('parentPath');
    expect(I18n.translate('parentPath.childPath')).to.be('#{name} message');
    expect(I18n.translate('parentPath.childPath', {name: 'Name'})).to.be('Name message');
  });

  it('#localize', function () {
    var date = new Date('01-01-2015');
    var integer = 9999999;
    var decimal = 999.99;
    var logic = true;

    I18n.locale = 'en';

    expect(I18n.localize(date)).to.be('2015-01-01');
    expect(I18n.localize(date, 'year')).to.be('2015');
    expect(I18n.localize(integer)).to.be('9,999,999');
    expect(I18n.localize(integer, 'customer')).to.be('9,999,999 Customers');
    expect(I18n.localize(decimal)).to.be('999.99');
    expect(I18n.localize(decimal, 'currency')).to.be('$ 999.99');
    expect(I18n.localize(logic)).to.be('yes');
    expect(I18n.localize(logic, 'up')).to.be('YES');

    I18n.locale = 'en-US';

    expect(I18n.localize(date)).to.be('2015 01 01');
    expect(I18n.localize(date, 'year')).to.be('2015 YEAR');
    expect(I18n.localize(integer)).to.be('9 999 999');
    expect(I18n.localize(integer, 'customer')).to.be('9 999 999 Customers');
    expect(I18n.localize(decimal)).to.be('999.99 USD');
    expect(I18n.localize(decimal, 'currency')).to.be('$ 999.99 USD');
    expect(I18n.localize(logic)).to.be('yes USD');
    expect(I18n.localize(logic, 'up')).to.be('YES USD');
  });

  it('#t', function () {
    expect(I18n.t.toString()).to.be(I18n.translate.toString());
  });

  it('#l', function () {
    expect(I18n.l.toString()).to.be(I18n.localize.toString());
  });

});