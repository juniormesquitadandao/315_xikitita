var Xktta = {
  window: this,
  afterInit: [],
  defineProperties: function(prototype, properties){
    var __this__ = this;

    Object.keys(properties).forEach(function(property){
      __this__.defineProperty(prototype, property, properties[property]);
    });

  },
  defineProperty: function(prototype, property, body){

    if(!prototype.hasOwnProperty(property)){
      Object.defineProperty(prototype, property, body);
    }

  }
};

Object.defineProperty(Xktta, 'init', {
  get: function(){

    this.classes = {};
    this.inflection = { singular: {}, plural: {} };
    this.translations = {};
    this.validators = {};

    this.afterInit.forEach(function(body){
      body();
    });

    return this;
  }
});