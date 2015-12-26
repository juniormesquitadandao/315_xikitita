var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('Xikitita', function() {
  
  before(function() {
    Xikitita
      .init
      .Inflection(function(){
        irregular('fish', 'fish');
        irregular('person', 'people');
      })
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
              return 'use external lib to date';
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
              return 'use external lib to time';
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
              return 'use external lib to date/time';
            }
          },
          pm: 'pm'
        },
        integer: {
          formats: {
            default: function(value){
              return 'use external lib to integer';
            }
          }
        },
        decimal: {
          formats: {
            default: function(value){
              return 'use external lib to decimal';
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
        errors: {
          format: '%{attribute} %{message}',
          messages: {
            blank: 'can\'t be blank',
            too_long: {
              one: 'is too long (maximum is 1 character)',
              other: 'is too long (maximum is %{count} characters)'
            },
            too_short: {
              one: 'is too short (minimum is 1 character)',
              other: 'is too short (minimum is %{count} characters)'
            },
            wrong_length: {
              one: 'is the wrong length (should be 1 character)',
              other: 'is the wrong length (should be %{count} characters)'
            },
            other_than: 'must be other than %{count}'
          }
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
              return 'usar lib externa para data';
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
              return 'usar lib externa para hora';
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
              return 'usar lib externa para data/hora';
            }
          },
          pm: 'pm'
        },
        integer: {
          formats: {
            default: function(value){
              return 'usar lib externa para inteiro';
            }
          }
        },
        decimal: {
          formats: {
            default: function(value){
              return 'usar lib externa para decimal';
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
        errors: {
          format: '%{attribute} %{message}',
          messages: {
            blank: 'não pode ficar em branco',
            too_long: {
              one: 'é muito longo (máximo é 1 caractere)',
              other: 'é muito longo (máximo: %{count} caracteres)'
            },
            too_short: {
              one: 'é muito curto (mínimo é 1 caractere)',
              other: 'é muito curto (mínimo: %{count} caracteres)'
            },
            wrong_length: {
              one: 'não possui o tamanho esperado (deve ter 1 caractere)',
              other: 'não possui o tamanho esperado (%{count} caracteres)'
            },
            other_than: 'deve ser diferente de %{count}'
          }
        }
      });
  });

  it('Inflection', function(){
    expect('customer'.pluralize).to.be('customers');
    expect('user'.pluralize).to.be('users');
    expect('permission'.pluralize).to.be('permissions');
    expect('fish'.pluralize).to.be('fish');
    expect('person'.pluralize).to.be('people');

    expect('customers'.singularize).to.be('customer');
    expect('users'.singularize).to.be('user');
    expect('permissions'.singularize).to.be('permission');
    expect('fish'.singularize).to.be('fish');
    expect('people'.singularize).to.be('person');
  });

  it('I18n', function(){
    var date = new Date('Sun, 15 Nov 2015 00:00:00 GMT-0300 (BRT)');

    expect(I18n.locale).to.be('en');

    expect(I18n.l(date)).to.be('2015-11-15');
    expect(I18n.l(date, {format: 'long'})).to.be('November 15, 2015');
    expect(I18n.l(date, {format: 'short'})).to.be('Nov 15');
    expect(I18n.l(date, {format: 'custom'})).to.be('use external lib to date');

    expect(I18n.l(date, {dateType: 'time'})).to.be('00:00:00 GMT-0300 (BRT)');
    expect(I18n.l(date, {dateType: 'time', format: 'long'})).to.be('00:00');
    expect(I18n.l(date, {dateType: 'time', format: 'meridiem'})).to.be('12:00:00 am GMT-0300 (BRT)');
    expect(I18n.l(date, {dateType: 'time', format: 'meridiemLong'})).to.be('12:00 am');
    expect(I18n.l(date, {dateType: 'time', format: 'custom'})).to.be('use external lib to time');

    expect(I18n.l(date, {dateType: 'dateTime'})).to.be('Sun, 15 Nov 2015 00:00:00 GMT-0300 (BRT)');
    expect(I18n.l(date, {dateType: 'dateTime', format: 'long'})).to.be('November 15, 2015 00:00');
    expect(I18n.l(date, {dateType: 'dateTime', format: 'short'})).to.be('15 Nov 00:00');
    expect(I18n.l(date, {dateType: 'dateTime', format: 'custom'})).to.be('use external lib to date/time');

    expect(I18n.l(0)).to.be('use external lib to integer');
    expect(I18n.l(0.0)).to.be('use external lib to integer');
    expect(I18n.l(0.0, {forceDecimal: true})).to.be('use external lib to decimal');
    expect(I18n.l(true)).to.be('Yes');
    expect(I18n.l(false)).to.be('No');


    I18n.locale = 'pt-BR';
    expect(I18n.locale).to.be('pt-BR');

    expect(I18n.l(date)).to.be('15/11/2015');
    expect(I18n.l(date, {format: 'long'})).to.be('15 de Novembro de 2015');
    expect(I18n.l(date, {format: 'short'})).to.be('15 de Novembro');
    expect(I18n.l(date, {format: 'custom'})).to.be('usar lib externa para data');

    expect(I18n.l(date, {dateType: 'time'})).to.be('00:00:00 GMT-0300 (BRT)');
    expect(I18n.l(date, {dateType: 'time', format: 'long'})).to.be('00:00');
    expect(I18n.l(date, {dateType: 'time', format: 'meridiem'})).to.be('12:00:00 am GMT-0300 (BRT)');
    expect(I18n.l(date, {dateType: 'time', format: 'meridiemLong'})).to.be('12:00 am');
    expect(I18n.l(date, {dateType: 'time', format: 'custom'})).to.be('usar lib externa para hora');

    expect(I18n.l(date, {dateType: 'dateTime'})).to.be('Dom, 15 de Novembro de 2015, 00:00:00 GMT-0300 (BRT)');
    expect(I18n.l(date, {dateType: 'dateTime', format: 'long'})).to.be('15 de Novembro de 2015, 00:00');
    expect(I18n.l(date, {dateType: 'dateTime', format: 'short'})).to.be('15 de Novembro, 00:00');
    expect(I18n.l(date, {dateType: 'dateTime', format: 'custom'})).to.be('usar lib externa para data/hora');

    expect(I18n.l(0)).to.be('usar lib externa para inteiro');
    expect(I18n.l(0.0)).to.be('usar lib externa para inteiro');
    expect(I18n.l(0.0, {forceDecimal: true})).to.be('usar lib externa para decimal');
    expect(I18n.l(true)).to.be('Sim');
    expect(I18n.l(false)).to.be('Não');
  });

});