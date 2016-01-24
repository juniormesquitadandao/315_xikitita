Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(Date.prototype, {
    localize: {
      value: function (options) {
        return I18n.localize(this, options); 
      }
    }
  });

});
