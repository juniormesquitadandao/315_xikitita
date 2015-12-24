Xikitita.Inflection = function(body){
  
  var irregular = function(singular, plural){
    Xikitita.inflection.singular[singular] = plural; 
    Xikitita.inflection.plural[plural] = singular;
  }

  eval("new function (){\n\
      var irregular = #{irregular};\n\
      (#{body})(this);\n\
    };"
    .replace(/#{irregular}/, irregular.toString())
    .replace(/#{body}/, body.toString())
  );

  return this;
}
