Xktta.I18n = function(locale, translations){
  this.translations[locale] = translations || {};
  return this;
}

Xktta.afterInit.push(function(){
  var __this__ = Xktta;

  eval.call(__this__.window, "var I18n;");

  I18n = {
    locale: 'en',
    translate: function(path, params){
      var translation = path;
      var translations = __this__.translations[I18n.locale] || {};
      path.split('.').forEach(function(key){
        translations = translations[key] || {};
      });

      if(typeof translations  === 'string'){
        translation = translations;
        params = params || {};
        translation = translation.interpolate(params, '%');
      }else if(typeof translations === 'object' && translations.constructor.name === 'Array'){
        translation = translations;
      } else {
        translation = '#{locale}.#{path}'.interpolate({locale: I18n.locale, path: path});
      }

      return translation;
    },
    localize: function(value, options){
      options = options || {};

      var format = options.format || 'default';
      var dateType = options.dateType || 'date';
      var formatted = value;

      if(typeof value === 'object' && value.constructor.name === 'Date'){
        var dayWeak = value.getDay();
        var month = value.getMonth() + 1;
        var dayMonth = value.getDate();
        var year = value.getFullYear();
        var hours = value.getHours();
        var minutes = value.getMinutes();
        var seconds = value.getSeconds();
        var meridiem = hours < 12 ? 'am' : 'pm';
        var zone = value.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];

        formatted = __this__.translations[I18n.locale][dateType].formats[format];

        var formatBy = {
          function: function(){
            formatted = formatted(value);
          },
          string: function(){
            var to = {
              date: function(){
                formatted = formatted
                  .interpolate({
                    a: I18n.t('date.abbrDayNames')[dayWeak],
                    A: I18n.t('date.dayNames')[dayWeak],
                    m: new String(month + 100).toString().substr(1),
                    b: I18n.t('date.abbrMonthNames')[month],
                    B: I18n.t('date.monthNames')[month],
                    d: new String(dayMonth + 100).toString().substr(1),
                    Y: year
                  }, '%', false);
              },
              time: function(){
                formatted = formatted
                  .interpolate({
                    h: new String( (hours || 24) - 12 + 100 ).toString().substr(1),
                    H: new String(hours + 100).toString().substr(1),
                    M: new String(minutes + 100).toString().substr(1),
                    S: new String(seconds + 100).toString().substr(1),
                    p: I18n.t(['time', meridiem].join('.')),
                    z: zone
                  }, '%', false);
              },
              datetime: function(){
                this.date();
                this.time();
              }
            }
            to[dateType]();
          }
        }

        formatBy[typeof formatted]();
      }
      else if(typeof value === 'number'){

        var functionFormat = __this__.translations[I18n.locale].integer.formats[format];
        if(/\./.test(value) || options.forceDecimal){
          functionFormat = __this__.translations[I18n.locale].decimal.formats[format];
        }
        formatted = functionFormat(value);

      }
      else if(typeof value === 'boolean'){
        formatted = __this__.translations[I18n.locale].logic.formats[format][value];
      }

      return formatted;
    }
  }

  I18n.t = I18n.translate
  I18n.l = I18n.localize

});