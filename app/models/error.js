Xikitita.Error = function(className){
  var __this__ = this;
  var __className__ = className;

  Object.defineProperties(__this__, {
    toJson: { 
      get: function () { 
        return JSON.stringify(__this__); 
      } 
    },
    asJson: { 
      get: function () { 
        return JSON.parse(__this__.toJson); 
      } 
    },
    isAny: {
      get: function(){
        return Object.keys(__this__).isAny;
      }
    },
    isEmpty: {
      get: function(){
        return !__this__.isAny;
      }
    },
    add: {
      value: function(attrName, message){
        __this__[attrName] = __this__[attrName] || [];
        __this__[attrName].push(message);
      }
    },
    clear: {
      get: function(){
        for (var attrName in __this__) delete __this__[attrName];
      }
    },
    messages: {
      get: function(){
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
        var fullMessages = [];

        Object.keys(__this__).forEach(function(attrName){
          var path = ['attributes', __className__, attrName].join('.');
          var attrNameTranslated = I18n.t(path);

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
