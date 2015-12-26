Xikitita.I18n = function(locale, translations){
  this.translations[locale] = translations || {};
  return this;
}

Xikitita.afterInit.push(function(){
  var __this__ = Xikitita;
  
  eval.call(__this__.window, "var I18n;");

  I18n = {
    locale: 'en',
    translate: function(path, params){
      var translation = path;
      var translations = __this__.translations[I18n.locale];
      path.split('.').forEach(function(key){
        translations = translations[key];
      });
 
      if(typeof translations  === 'string'){
        translation = translations;
        params = params || {};
        Object.keys(params).forEach(function(param) {          
          translation = translation.replace(new RegExp('%{' + param + '}', 'ig'), params[param]);
        });
      }else if(typeof translations === 'object' && translations.constructor.name === 'Array'){
        translation = translations;
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

        var formattedTo = {
          date: function(){
            formatted = formatted
              .replace(/%a/g, I18n.t('date.abbrDayNames')[dayWeak])
              .replace(/%A/g, I18n.t('date.dayNames')[dayWeak])
              .replace(/%m/g, new String(month + 100).toString().substr(1))
              .replace(/%b/g, I18n.t('date.abbrMonthNames')[month])
              .replace(/%B/g, I18n.t('date.monthNames')[month])
              .replace(/%d/g, new String(dayMonth + 100).toString().substr(1))
              .replace(/%Y/g, year);
          },
          time: function(){
            formatted = formatted
              .replace(/%h/g, new String( (hours || 24) - 12 + 100 ).toString().substr(1) )
              .replace(/%H/g, new String(hours + 100).toString().substr(1) )
              .replace(/%M/g, new String(minutes + 100).toString().substr(1) )
              .replace(/%S/g, new String(seconds + 100).toString().substr(1) )
              .replace(/%p/g, I18n.t(['time', meridiem].join('.')))
              .replace(/%z/g, zone);
          },
          dateTime: function(){
            this.date();
            this.time();
          }
        }

        formattedTo[dateType]();
      }
      else if(typeof value === 'number' ){
        
        var functionFormat = __this__.translations[I18n.locale].integer.formats[format];
        if(/\./.test(value)){
          functionFormat = __this__.translations[I18n.locale].decimal.formats[format];
        }
        formatted = functionFormat(value);

      }
      else if(typeof value === 'boolean' ){
        formatted = __this__.translations[I18n.locale].logic.formats[format](value);
      }

      return formatted;
    }
  }

  I18n.t = I18n.translate
  I18n.l = I18n.localize

});