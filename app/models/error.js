Xikitita.Error = function(modelName){

  var modelName = modelName;

  Object.defineProperties(this, {
    toJson: { 
      get: function () { 
        return JSON.stringify(this); 
      } 
    },
    asJson: { 
      get: function () { 
        return JSON.parse(this.toJson); 
      } 
    },
    isAny: {
      get: function(){
        return Object.keys(this).isAny;
      }
    },
    isEmpty: {
      get: function(){
        return !this.isAny;
      }
    },
    add: {
      value: function(attrName, message){
        this[attrName] = this[attrName] || [];
        this[attrName].push(message);
      }
    },
    clear: {
      get: function(){
        for (var attrName in this) delete this[attrName];
      }
    },
    messages: {
      get: function(){
        var __this__ =  this;
        var messages = [];

        Object.keys(__this__).forEach(function(attrName){
          
          __this__[attrName].forEach(function(message){
            messages.push(message);
          });

        });

        return messages;
      }
    },
    fullMessages: {
      get: function(){
        var __this__ =  this;
        var fullMessages = [];

        Object.keys(__this__).forEach(function(attrName){
          var attrNameTranslated = I18n.t(['attributes', modelName, attrName].join('.'));

          __this__[attrName].forEach(function(message){
            var fullMessage = I18n
              .t('errors.format')
              .replace(/#{attribute}/, attrNameTranslated)
              .replace(/#{message}/, message);

            fullMessages.push(fullMessage);
          });

        });

        return fullMessages;
      }
    }
  });
}
