Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(Object.prototype, {
    toJson: {
      get: function () { 
        return JSON.stringify(this); 
      }
    },
    asJson: {
      get: function () { 
        return JSON.parse(this.toJson); 
      } 
    },
    isAny: {
      get: function () {
        return Object.keys(this).length > 0; 
      }
    },
    isEmpty: { 
      get: function () { 
        return !this.isAny;
      }
    }
  });

});
