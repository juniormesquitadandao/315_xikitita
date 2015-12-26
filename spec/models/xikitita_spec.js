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
            short: '%b %d'
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
          ],
          order: [
            'year',
            'month',
            'day'
          ]
        },
        integer: {
          formats: {
            default: function(value){ 
              "%Y-%m-%d"
            }
          }
        },
        decimal: {
          formats: {
            default: function(value){ 
              "%Y-%m-%d"
            }
          }
        },
        logic: {
          formats: {
            default: function(value){ 
              "%Y-%m-%d"
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
          formats: {
            default: function(value){ 
              "%Y-%m-%d"
            },
            long: function(value){
              "%B %d, %Y"
            },
            short: function(value){
              "%b %d"
            }
          }
        },
        integer: {
          formats: {
            default: function(value){ 
              "%Y-%m-%d"
            }
          }
        },
        decimal: {
          formats: {
            default: function(value){ 
              "%Y-%m-%d"
            }
          }
        },
        logic: {
          formats: {
            default: function(){ 
              "%Y-%m-%d"
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
    var date = new Date('11-15-2015');

    expect(I18n.locale).to.be('en');
    expect(I18n.l(date)).to.be('2015-11-15');
  });

});