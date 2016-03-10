Xikitita.Error = function(className){
  var __this__ = this;
  var __className__ = className;

  Object.defineProperties(__this__, {

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
          var path = ['classes', __className__, 'attributes', attrName].join('.');
          var attrNameTranslated = I18n.t(path);

          __this__[attrName].forEach(function(message){
            var fullMessage = I18n
              .t('errors.format')
              .interpolate({
                attribute: attrNameTranslated,
                message: message
              }, '%');

            fullMessages.push(fullMessage);
          });

        });

        return fullMessages;
      }
    }
  });
}
