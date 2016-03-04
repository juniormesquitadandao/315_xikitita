Xikitita
.init
.Inflection(function(){
  irregular('fish', 'fish');
  irregular('person', 'people');

  irregular('model', 'models');
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
        return 'use external lib to format date';
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
        return 'use external lib to format time';
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
        return 'use external lib to format datetime';
      }
    },
    pm: 'pm'
  },
  integer: {
    formats: {
      default: function(value){
        return value;
      }
    }
  },
  decimal: {
    formats: {
      default: function(value){
        return value;
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
      newRecord: 'can\'t be new record'
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
        return 'usar lib externa para formatar data';
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
        return 'usar lib externa para formatar hora';
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
        return 'usar lib externa para formatar data/hora';
      }
    },
    pm: 'pm'
  },
  integer: {
    formats: {
      default: function(value){
        return 'usar lib externa para formatar inteiro';
      }
    }
  },
  decimal: {
    formats: {
      default: function(value){
        return 'usar lib externa para formatar decimal';
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
      newRecord: 'não pode ser novo registro'
    }
  }
});