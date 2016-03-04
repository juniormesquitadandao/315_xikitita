Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(Date.prototype, {
    localize: {
      value: function (options) {
        return this.l(options); 
      }
    },
    l: {
      value: function (options) {
        return I18n.l(this, options); 
      }
    },
  });

});
