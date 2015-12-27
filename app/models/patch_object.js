Xikitita.afterInit.push(function(){

  Xikitita.defineProperties(Object.prototype, {
    toJson: {
      get: function () {
        var __toJson__ = this;
        if(typeof this !== 'string'){
          __toJson__ = JSON.stringify(__toJson__);
        }
        return __toJson__; 
      }
    },
    asJson: {
      get: function () { 
        return JSON.parse(this.toJson); 
      } 
    },
    isAny: {
      get: function () {
        return Object.keys(this).length > 0 || this.constructor.name === 'Boolean'; 
      }
    },
    isEmpty: { 
      get: function () { 
        return !this.isAny;
      }
    }
  });

});
