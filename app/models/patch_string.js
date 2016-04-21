Xktta.afterInit.push(function(){

  Xktta.defineProperties(String.prototype, {
    capitalize: {
      get: function(){
        return this.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
      }
    },
    pluralize: {
      get: function(){
        var irregular = this;
        var regex = irregular;
        var replace = Xktta.inflection.singular[irregular] || null;

        if(!replace){
          regex = /$/;
          replace = 's';
        }

        return this.replace(regex, replace);
      }
    },
    singularize: {
      get: function(){
        var irregular = this;
        var regex = irregular;
        var replace = Xktta.inflection.plural[irregular] || null;

        if(!replace){
          regex = /s$/;
          replace = '';
        }

        return this.replace(regex, replace);
      }
    },
    interpolate: {
      value: function(params, identifier, isBoundary){
        identifier = identifier || '#';
        isBoundary = isBoundary === undefined ? true : isBoundary;

        var boundary = !isBoundary ? '  ' : '{}';
        var interpolated = this;

        Object.keys(params).forEach(function(param){
          var regex = [identifier, boundary[0].trim(), param, boundary[1].trim()].join('');
          interpolated = interpolated.replace(new RegExp(regex, 'g'), params[param]);
        });

        return interpolated;
      }
    }
  });

});