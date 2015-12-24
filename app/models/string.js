Object.defineProperty(String.prototype, 'capitalize', {
  get: function(){
    return this.replace(/(\w)/, function($1){ return $1.toUpperCase(); });
  }
});

Object.defineProperty(String.prototype, 'pluralize', {
  get: function(){
    var regex = this;
    var replace = Xikitita.inflection.plural[this] || null;

    if(!replace){
      regex = /$/;
      replace = 's';
    }

    return this.replace(regex, replace);
  }
});

Object.defineProperty(String.prototype, 'singularize', {
  get: function(){
    var regex = this;
    var replace = Xikitita.inflection.singular[this] || null;

    if(!replace){
      regex = /s$/;
      replace = '';
    }

    return this.replace(regex, replace);
  }
});