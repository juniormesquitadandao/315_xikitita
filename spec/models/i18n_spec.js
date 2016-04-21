var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('I18n', function() {

  before(function() {
    Xikitita
      .init
      .I18n('en', {
        date: {
          abbrDayNames: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ],
          abbrMonthNames: [
            null,
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          dayNames: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          formats: {
            default: '%Y-%m-%d',
            long: '%B %d, %Y',
            short: '%b %d',
            custom: function(value){
              return value.toString();
            }
          },
          monthNames: [
            null,
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ]
        },
        time: {
          am: 'am',
          formats: {
            default: '%H:%M:%S %z',
            long: '%H:%M',
            meridiem: '%h:%M:%S %p %z',
            meridiemLong: '%h:%M %p',
            custom: function(value){
              return value.toString();
            }
          },
          pm: 'pm'
        },
        datetime: {
          am: 'am',
          formats: {
            default: '%a, %d %b %Y %H:%M:%S %z',
            long: '%B %d, %Y %H:%M',
            short: '%d %b %H:%M',
            custom: function(value){
              return value.toString();
            }
          },
          pm: 'pm'
        },
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
        },
        logic: {
          formats: {
            default: {
              true: 'Yes',
              false: 'No'
            }
          }
        },
        parentPath: {
          childPath: 'message %{name}'
        }
      })
      .I18n('pt-BR', {
        date: {
          abbrDayNames: [
            'Dom',
            'Seg',
            'Ter',
            'Qua',
            'Qui',
            'Sex',
            'Sáb'
          ],
          abbrMonthNames: [
            null,
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez'
          ],
          dayNames: [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado'
          ],
          formats: {
            default: '%d/%m/%Y',
            long: '%d de %B de %Y',
            short: '%d de %B',
            custom: function(value){
              return value.toString();
            }
          },
          monthNames: [
            null,
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
          ]
        },
        time: {
          am: 'am',
          formats: {
            default: '%H:%M:%S %z',
            long: '%H:%M',
            meridiem: '%h:%M:%S %p %z',
            meridiemLong: '%h:%M %p',
            custom: function(value){
              return value.toString();
            }
          },
          pm: 'pm'
        },
        datetime: {
          am: 'am',
          formats: {
            default: '%a, %d de %B de %Y, %H:%M:%S %z',
            long: '%d de %B de %Y, %H:%M',
            short: '%d de %B, %H:%M',
            custom: function(value){
              return value.toString();
            }
          },
          pm: 'pm'
        },
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
        },
        logic: {
          formats: {
            default: {
              true: 'Sim',
              false: 'Não'
            }
          }
        },
        parentPath: {
          childPath: 'mensagem %{name}'
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

    expect(I18n.translate('parentPath')).to.be('en.parentPath');
    expect(I18n.translate('parentPath.childPath')).to.be('message %{name}');
    expect(I18n.translate('parentPath.childPath', {name: 'Name'})).to.be('message Name');

    I18n.locale = 'pt-BR';

    expect(I18n.translate('parentPath')).to.be('pt-BR.parentPath');
    expect(I18n.translate('parentPath.childPath')).to.be('mensagem %{name}');
    expect(I18n.translate('parentPath.childPath', {name: 'Name'})).to.be('mensagem Name');

    I18n.locale = 'de';

    expect(I18n.translate('parentPath')).to.be('de.parentPath');
    expect(I18n.translate('parentPath.childPath')).to.be('de.parentPath.childPath');
    expect(I18n.translate('parentPath.childPath', {name: 'Name'})).to.be('de.parentPath.childPath');
  });

  it('#localize', function () {
    var myDateBirth = new Date('Thu, 18 Aug 1988 18:00:00 GMT-0300 (BRT)');
    var integer = 9999999;
    var decimal = 9999999.99;
    var logic = true;

    I18n.locale = 'en';

    expect(I18n.localize(myDateBirth)).to.be('1988-08-18');
    expect(I18n.localize(myDateBirth, {format: 'long'})).to.be('August 18, 1988');
    expect(I18n.localize(myDateBirth, {format: 'short'})).to.be('Aug 18');
    expect(I18n.localize(myDateBirth, {format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(I18n.localize(myDateBirth, {dateType: 'time'})).to.be('18:00:00 GMT-0300 (BRT)');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'long'})).to.be('18:00');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'meridiem'})).to.be('06:00:00 pm GMT-0300 (BRT)');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'meridiemLong'})).to.be('06:00 pm');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(I18n.localize(myDateBirth, {dateType: 'datetime'})).to.be('Thu, 18 Aug 1988 18:00:00 GMT-0300 (BRT)');
    expect(I18n.localize(myDateBirth, {dateType: 'datetime', format: 'long'})).to.be('August 18, 1988 18:00');
    expect(I18n.localize(myDateBirth, {dateType: 'datetime', format: 'short'})).to.be('18 Aug 18:00');
    expect(I18n.localize(myDateBirth, {dateType: 'datetime', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(I18n.localize(integer)).to.be('9,999,999');
    expect(I18n.localize(decimal)).to.be('9,999,999.99');
    expect(I18n.localize(0.0)).to.be('9,999,999');
    expect(I18n.localize(0.0, {forceDecimal: true})).to.be('9,999,999.99');
    expect(I18n.localize(logic)).to.be('Yes');
    expect(I18n.localize(!logic)).to.be('No');

    I18n.locale = 'pt-BR';

    expect(I18n.localize(myDateBirth)).to.be('18/08/1988');
    expect(I18n.localize(myDateBirth, {format: 'long'})).to.be('18 de Agosto de 1988');
    expect(I18n.localize(myDateBirth, {format: 'short'})).to.be('18 de Agosto');
    expect(I18n.localize(myDateBirth, {format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(I18n.localize(myDateBirth, {dateType: 'time'})).to.be('18:00:00 GMT-0300 (BRT)');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'long'})).to.be('18:00');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'meridiem'})).to.be('06:00:00 pm GMT-0300 (BRT)');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'meridiemLong'})).to.be('06:00 pm');
    expect(I18n.localize(myDateBirth, {dateType: 'time', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(I18n.localize(myDateBirth, {dateType: 'datetime'})).to.be('Qui, 18 de Agosto de 1988, 18:00:00 GMT-0300 (BRT)');
    expect(I18n.localize(myDateBirth, {dateType: 'datetime', format: 'long'})).to.be('18 de Agosto de 1988, 18:00');
    expect(I18n.localize(myDateBirth, {dateType: 'datetime', format: 'short'})).to.be('18 de Agosto, 18:00');
    expect(I18n.localize(myDateBirth, {dateType: 'datetime', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(I18n.localize(integer)).to.be('9.999.999');
    expect(I18n.localize(decimal)).to.be('9.999.999,99');
    expect(I18n.localize(logic)).to.be('Sim');
    expect(I18n.localize(!logic)).to.be('Não');
  });

  it('#t', function () {
    expect(I18n.t.toString()).to.be(I18n.translate.toString());
  });

  it('#l', function () {
    expect(I18n.l.toString()).to.be(I18n.localize.toString());
  });

});