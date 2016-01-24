var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Patch Date', function() {

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
        dateTime: {
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
        dateTime: {
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
  
  it('#localize', function () {
    var myDateBirth = new Date('Thu, 18 Aug 1988 18:00:00 GMT-0300 (BRT)');

    I18n.locale = 'en';

    expect(myDateBirth.localize()).to.be('1988-08-18');
    expect(myDateBirth.localize({format: 'long'})).to.be('August 18, 1988');
    expect(myDateBirth.localize({format: 'short'})).to.be('Aug 18');
    expect(myDateBirth.localize({format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(myDateBirth.localize({dateType: 'time'})).to.be('18:00:00 GMT-0300 (BRT)');
    expect(myDateBirth.localize({dateType: 'time', format: 'long'})).to.be('18:00');
    expect(myDateBirth.localize({dateType: 'time', format: 'meridiem'})).to.be('06:00:00 pm GMT-0300 (BRT)');
    expect(myDateBirth.localize({dateType: 'time', format: 'meridiemLong'})).to.be('06:00 pm');
    expect(myDateBirth.localize({dateType: 'time', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(myDateBirth.localize({dateType: 'dateTime'})).to.be('Thu, 18 Aug 1988 18:00:00 GMT-0300 (BRT)');
    expect(myDateBirth.localize({dateType: 'dateTime', format: 'long'})).to.be('August 18, 1988 18:00');
    expect(myDateBirth.localize({dateType: 'dateTime', format: 'short'})).to.be('18 Aug 18:00');
    expect(myDateBirth.localize({dateType: 'dateTime', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    I18n.locale = 'pt-BR';

    expect(myDateBirth.localize()).to.be('18/08/1988');
    expect(myDateBirth.localize({format: 'long'})).to.be('18 de Agosto de 1988');
    expect(myDateBirth.localize({format: 'short'})).to.be('18 de Agosto');
    expect(myDateBirth.localize({format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(myDateBirth.localize({dateType: 'time'})).to.be('18:00:00 GMT-0300 (BRT)');
    expect(myDateBirth.localize({dateType: 'time', format: 'long'})).to.be('18:00');
    expect(myDateBirth.localize({dateType: 'time', format: 'meridiem'})).to.be('06:00:00 pm GMT-0300 (BRT)');
    expect(myDateBirth.localize({dateType: 'time', format: 'meridiemLong'})).to.be('06:00 pm');
    expect(myDateBirth.localize({dateType: 'time', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(myDateBirth.localize({dateType: 'dateTime'})).to.be('Qui, 18 de Agosto de 1988, 18:00:00 GMT-0300 (BRT)');
    expect(myDateBirth.localize({dateType: 'dateTime', format: 'long'})).to.be('18 de Agosto de 1988, 18:00');
    expect(myDateBirth.localize({dateType: 'dateTime', format: 'short'})).to.be('18 de Agosto, 18:00');
    expect(myDateBirth.localize({dateType: 'dateTime', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');
  });

  it('#l', function () {
    var myDateBirth = new Date('Thu, 18 Aug 1988 18:00:00 GMT-0300 (BRT)');

    I18n.locale = 'en';

    expect(myDateBirth.l()).to.be('1988-08-18');
    expect(myDateBirth.l({format: 'long'})).to.be('August 18, 1988');
    expect(myDateBirth.l({format: 'short'})).to.be('Aug 18');
    expect(myDateBirth.l({format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(myDateBirth.l({dateType: 'time'})).to.be('18:00:00 GMT-0300 (BRT)');
    expect(myDateBirth.l({dateType: 'time', format: 'long'})).to.be('18:00');
    expect(myDateBirth.l({dateType: 'time', format: 'meridiem'})).to.be('06:00:00 pm GMT-0300 (BRT)');
    expect(myDateBirth.l({dateType: 'time', format: 'meridiemLong'})).to.be('06:00 pm');
    expect(myDateBirth.l({dateType: 'time', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(myDateBirth.l({dateType: 'dateTime'})).to.be('Thu, 18 Aug 1988 18:00:00 GMT-0300 (BRT)');
    expect(myDateBirth.l({dateType: 'dateTime', format: 'long'})).to.be('August 18, 1988 18:00');
    expect(myDateBirth.l({dateType: 'dateTime', format: 'short'})).to.be('18 Aug 18:00');
    expect(myDateBirth.l({dateType: 'dateTime', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    I18n.locale = 'pt-BR';

    expect(myDateBirth.l()).to.be('18/08/1988');
    expect(myDateBirth.l({format: 'long'})).to.be('18 de Agosto de 1988');
    expect(myDateBirth.l({format: 'short'})).to.be('18 de Agosto');
    expect(myDateBirth.l({format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(myDateBirth.l({dateType: 'time'})).to.be('18:00:00 GMT-0300 (BRT)');
    expect(myDateBirth.l({dateType: 'time', format: 'long'})).to.be('18:00');
    expect(myDateBirth.l({dateType: 'time', format: 'meridiem'})).to.be('06:00:00 pm GMT-0300 (BRT)');
    expect(myDateBirth.l({dateType: 'time', format: 'meridiemLong'})).to.be('06:00 pm');
    expect(myDateBirth.l({dateType: 'time', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');

    expect(myDateBirth.l({dateType: 'dateTime'})).to.be('Qui, 18 de Agosto de 1988, 18:00:00 GMT-0300 (BRT)');
    expect(myDateBirth.l({dateType: 'dateTime', format: 'long'})).to.be('18 de Agosto de 1988, 18:00');
    expect(myDateBirth.l({dateType: 'dateTime', format: 'short'})).to.be('18 de Agosto, 18:00');
    expect(myDateBirth.l({dateType: 'dateTime', format: 'custom'})).to.be('Thu Aug 18 1988 18:00:00 GMT-0300 (BRT)');
  });

});