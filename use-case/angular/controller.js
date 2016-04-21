App.controller('ModelsController', function(){
  var self = this;

  self.models = [];

  self.model = new Model({
    text: 'text',
    integer: '9999',
    decimal: '9999.99',
    date: new Date().l(),
    time: new Date().l({dateType: 'time', format: 'long'}),
    datetime: new Date().l({dateType: 'datetime', format: 'medium'}),
    logic: true
  });

  self.changeLanguage = function(language){

    if(I18n.locale !== language){

      I18n.locale = language;

      if(language === 'pt-BR'){

        if (self.model.integer){
          numeral.language('en');
          self.model.integer = numeral().unformat(self.model.integer).l();
          numeral.language('pt-br');
        }else{
          self.model.integer = null;
        }

        if (self.model.decimal){
          numeral.language('en');
          self.model.decimal = numeral().unformat(self.model.decimal).l();
          numeral.language('pt-br');
        }else{
          self.model.decimal = null;
        }

        var value = moment(self.model.date, 'YYYY-MM-DD').toDate();
        self.model.date = isNaN(value) ? null : value.l();

        var value = moment(self.model.time, 'HH:mm').toDate();
        self.model.time = self.model.time ? value.l({dateType: 'time', format: 'long'}) : null;

        var value = moment(self.model.datetime, 'YYYY-MM-DD HH:mm').toDate();
        self.model.datetime = isNaN(value) ? null : value.l({dateType: 'datetime', format: 'medium'});
      }else{

        if (self.model.integer){
          numeral.language('pt-br');
          self.model.integer = numeral().unformat(self.model.integer).l();
          numeral.language('en');
        }else{
          self.model.integer = null;
        }

        if (self.model.decimal){
          numeral.language('pt-br');
          self.model.decimal = numeral().unformat(self.model.decimal).l();
          numeral.language('en');
        }else{
          self.model.decimal = null;
        }

        var value = moment(self.model.date, 'DD/MM/YYYY').toDate();
        self.model.date = isNaN(value) ? null : value.l();

        var value = moment(self.model.time, 'HH:mm').toDate();
        self.model.time = self.model.time ? value.l({dateType: 'time', format: 'long'}) : null;

        var value = moment(self.model.datetime, 'DD-MM-YYYY HH:mm').toDate();
        self.model.datetime = isNaN(value) ? null : value.l({dateType: 'datetime', format: 'medium'});
      }

    }

  }

  self.new = function(){
    self.model = new Model();
  }

  self.edit = function(id){
    model = self.models[id - 1];

    modelTMP = new Model();
    modelTMP.id = model.id;
    modelTMP.text = model.text;
    modelTMP.integer = model.integer.l();
    modelTMP.decimal = model.decimal.l();
    modelTMP.date = model.date.l();
    modelTMP.time = model.time.l({dateType: 'time', format: 'long'});
    modelTMP.datetime = model.datetime.l({dateType: 'datetime', format: 'medium'});
    modelTMP.logic = model.logic;

    self.model = new Model(modelTMP);
  }

  self.save = function(){
    if(self.model.isValid){

      self.model.integer = numeral().unformat(self.model.integer);
      self.model.decimal = numeral().unformat(self.model.decimal);

      var value = moment(self.model.date, (I18n.locale == 'en' ? 'YYYY-MM-DD' : 'DD/MM/YYYY') ).toDate();
      self.model.date = isNaN(value) ? null : value;

      var value = moment(self.model.time, 'HH:mm').toDate();
      self.model.time = self.model.time ? value : null;

      var value = moment(self.model.datetime, (I18n.locale == 'en' ? 'YYYY-MM-DD HH:mm' : 'DD-MM-YYYY HH:mm') ).toDate();
      self.model.datetime = isNaN(value) ? null : value;

      if( !self.model.id ){
        self.model.id = self.models.length + 1;
        self.models.push(self.model);
      } else {
        self.models[self.model.id - 1] = self.model;
      }
      this.new();
    }
  }

  self.destroy = function(id){
    self.models.splice(id - 1, 1);

    self.models.forEach(function(model, index){
      model.id = index + 1;
    });
  }

});