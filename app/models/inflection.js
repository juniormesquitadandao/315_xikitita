Xikitita.Inflection = function(body){
  var __this__ = this;

  var irregular = function(singular, plural){
    __this__.inflection.singular[singular] = plural; 
    __this__.inflection.plural[plural] = singular;
  }

  eval("new function (){\n\
      var irregular = #{irregular};\n\
      (#{body})(this);\n\
    };"
    .replace(/#{irregular}/, irregular.toString())
    .replace(/#{body}/, body.toString())
  );

  return __this__;
}
