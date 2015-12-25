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
          translation = translation.replace(new RegExp('#{' + param + '}', 'ig'), params[param]);
        });
      }

      return translation;
    },
    localize: function(value, format){
      format = format || 'default';
      var formatted = value;

      if(typeof value === 'object' && value.constructor.name === 'Date'){
        formatted = __this__.translations[I18n.locale].date.formats[format](value);
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