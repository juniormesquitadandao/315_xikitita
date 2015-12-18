var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');

Xikitita
.I18n('en', {
  date: {
    default: function(date){
      return '2015-01-01';
    }, 
    year: function(date){
      return '2015';
    } 
  },  
  integer: {
    default: function(date){
      return '9,999,999';
    }, 
    cliente: function(date){
      return '9,999,999 Clientes';
    } 
  },  
  decimal: {
    default: function(date){
      return '999.99';
    }, 
    currency: function(date){
      return '$ 999.99';
    }
  },  
  parent: {
    child: 'message #{name}'   
  }
})
.I18n('en-US', {
  date: {
    default: function(date){
      return '2015 01 01';
    }, 
    year: function(date){
      return 'Year 2015';
    } 
  },  
  integer: {
    default: function(date){
      return '9 999 999';
    }, 
    cliente: function(date){
      return 'Clientes 9 999 999';
    } 
  },  
  decimal: {
    default: function(date){
      return '999.99 USD';
    }, 
    currency: function(date){
      return '$ 999.99 USD';
    }
  },  
  parent: {
    child: 'message #{name}'   
  }
});

describe('I18n', function() {

  it('#locale', function () {
    expect(I18n.locale).to.be('en');

    I18n.locale = 'en-US';
    expect(I18n.locale).to.be('en-US');
  });

  it('#t', function () {
    expect(I18n.t('parent')).to.be('parent');
    expect(I18n.t('parent.child')).to.be('message #{name}');
    expect(I18n.t('parent.child', {name: 'Name'})).to.be('message Name');

    I18n.locale = 'en-US';

    expect(I18n.t('parent')).to.be('parent');
    expect(I18n.t('parent.child')).to.be('message #{name}');
    expect(I18n.t('parent.child', {name: 'Name'})).to.be('message Name');
  });

  it('#l', function () {
    I18n.locale = 'en-US';
    var date = new Date('01-01-2015');
    var integer = 9999999
    var decimal = 999.99

    expect(I18n.l(date)).to.be('2015-01-01');
    expect(I18n.l(date, 'year')).to.be('2015');
    expect(I18n.l(integer)).to.be('9,999,999');
    expect(I18n.l(integer, 'cliente')).to.be('9,999,999 Clientes');
    expect(I18n.l(decimal)).to.be('999.99');
    expect(I18n.l(decimal, 'currency')).to.be('$ 999.99');

    I18n.locale = 'en-US';

    expect(I18n.l(date)).to.be('2015 01 01');
    expect(I18n.l(date, 'year')).to.be('Year 2015');
    expect(I18n.l(integer)).to.be('9 999 999');
    expect(I18n.l(integer, 'cliente')).to.be('Clientes 9,999,999');
    expect(I18n.l(decimal)).to.be('999.99 USD');
    expect(I18n.l(decimal, 'currency')).to.be('$ 999.99 USD');
  });

});