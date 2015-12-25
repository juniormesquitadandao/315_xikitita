Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(String.prototype, {
    capitalize: { 
      get: function(){
        return this.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
      }
    },
    pluralize: { 
      get: function(){
        var irregular = this;
        var regex = irregular;
        var replace = Xikitita.inflection.singular[irregular] || null;

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
        var replace = Xikitita.inflection.plural[irregular] || null;

        if(!replace){
          regex = /s$/;
          replace = '';
        }

        return this.replace(regex, replace);
      }
    }
  });

});