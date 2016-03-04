Xikitita.Validator = function(name, body){
  this.validators[name.toLowerCase()] = body;
  return this;
}

Xikitita.afterInit.push(function(){

  Xikitita
    .Validator('Presence', function(value, attrName, object, options){
      
      return {
        success: value ? value.isAny : ['number', 'boolean'].indexOf(typeof value) > -1,
        fail: {
          messageName: 'blank'
        }
      };
    })
    .Validator('Length', function(value, attrName, object, options){
      var validators = {
        maximum: function(maxValue){
          return {
            success: value ? value.length <= maxValue : false,
            fail: {
              messageName: maxValue === 1 ? 'too_long.one' : 'too_long.other',
              params: {
                count: maxValue 
              }
            }
          };
        },
        minimum: function(minValue){
          return {
            success: value ? value.length >= minValue: false,
            fail: {
              messageName: minValue === 1 ? 'too_short.one' : 'too_short.other',
              params: {
                count: minValue
              }
            }
          };
        },
        in: function(inValues){
          var result = this.minimum(inValues[0]);
          if (result.success){
            return this.maximum(inValues[1]);
          }
          return result;
        },
        is: function(isValue){
          return {
            success: value ? value.length === isValue : false,
            fail: {
              messageName: isValue === 1 ? 'wrong_length.one' : 'wrong_length.other',
              params: {
               count: isValue
              }
            }
          };
        }
      };

      var lastResult = {success: true};
      Object.keys(validators).forEach(function(validator){

        var validatorValue = options[validator] || null;
        if(validatorValue){

          var actualResult = validators[validator](validatorValue);
          if(options.allowNull && value === null){
            actualResult.success = true;
          }

          if(!actualResult.success){

            lastResult = actualResult;
          }
        }

      });

      return lastResult;
    });

});