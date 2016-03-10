function eventLoad(){
  models = [];

  model = new Model({
    text: 'text',
    integer: 9999,
    decimal: 9999.99,
    date: new Date(),
    time: new Date(),
    datetime: new Date(),
    logic: true
  });

  eventNew();
}

function eventBind(element){

  var events = {
    text: function(){
      model.text = element.value;
    },
    integer: function(){
      var value = element.value ? numeral().unformat(element.value) : null;
      model.integer = value;
      eventSetValue('integer');
    },
    decimal: function(){
      var value = element.value ? numeral().unformat(element.value) : null;
      model.decimal = value;

      if(/\.\d{2}|\,\d{2}/.test(element.value)){
        eventSetValue('decimal');
      }
    },
    date: function(){
      var value = moment(element.value, (I18n.locale == 'en' ? 'YYYY-MM-DD' : 'DD/MM/YYYY') ).toDate();
      model.date = isNaN(value) ? null : value;
      
      if(element.value.replace(/-|\//g, '').length == 8){
        eventSetValue('date');
      }
    },
    time: function(){
      var value = moment(element.value, 'HH:mm').toDate();
      model.time = element.value ? value : null;
      
      if(element.value.replace(':', '').length == 4){
        eventSetValue('time');
      }
    },
    datetime: function(){
      var value = moment(element.value, (I18n.locale == 'en' ? 'YYYY-MM-DD HH:mm' : 'DD-MM-YYYY HH:mm') ).toDate();
      model.datetime = isNaN(value) ? null : value;

      if(element.value.replace(':', '').replace(/-|\//g, '').replace(/\s/g, '').length == 12){
        eventSetValue('datetime');
      }
    },
    logic: function(){
      model.logic = element.checked;
      eventSetValue('logic');
    }
  }

  events[element.id]();
  model.isValid;
  eventSetError(element.id);

}

function eventNew(){
  eventSetValue();
  eventSetError();
}

function eventReset(){
  model.reset;
  eventSetValue();
}

function eventSetValue(attribute){

  var events = {
    text: function(){
      document.getElementById('text').value = model.text;
    },
    integer: function(){
      document.getElementById('integer').value = model.integer ? model.integer.l() : model.integer;
    },
    decimal: function(){
      document.getElementById('decimal').value = model.decimal ? model.decimal.l() : model.decimal;
    },
    date: function(){
      document.getElementById('date').value = model.date ? model.date.l() : model.date;
    },
    time: function(){
      document.getElementById('time').value = model.time ? model.time.l({dateType: 'time', format: 'long'}) : model.time;
    },
    datetime: function(){
      document.getElementById('datetime').value = model.datetime ? model.datetime.l({dateType: 'datetime', format: 'medium'}) : model.datetime;
    },
    logic: function(){
      var label = model.toHuman.logic;
      if(model.logic != null){
        label += ' (#{value})'.interpolate({value: model.logic.l()});
      }

      document.getElementById('logic-label').innerHTML = label;
      document.getElementById('logic').checked = model.logic;
    }
  }

  if(attribute){
    events[attribute]();
  }else{
    Object.keys(events).forEach(function(event){
      events[event]();
    });    
  }
}

function eventSetError(attribute){

  if(attribute){
    document.getElementById('#{attribute}-error'.interpolate
      ({attribute: attribute})).innerHTML = model.errors[attribute] ? model.errors[attribute][0] : '';
  }else{
    Object.keys(model).forEach(function(attribute){
      document.getElementById('#{attribute}-error'.interpolate
      ({attribute: attribute})).innerHTML = model.errors[attribute] ? model.errors[attribute][0] : '';
    });    
  }
}

function eventSetLabel(attribute){

  var events = {
    text: function(){
      document.getElementById('text-label').innerHTML = model.toHuman.text;
    },
    integer: function(){
      document.getElementById('integer-label').innerHTML = model.toHuman.integer;
    },
    decimal: function(){
      document.getElementById('decimal-label').innerHTML = model.toHuman.decimal;
    },
    date: function(){
      document.getElementById('date-label').innerHTML = model.toHuman.date;
    },
    time: function(){
      document.getElementById('time-label').innerHTML = model.toHuman.time;
    },
    datetime: function(){
      document.getElementById('datetime-label').innerHTML = model.toHuman.datetime;
    },
    logic: function(){
      var label = model.toHuman.logic;

      if(model.logic != null){
        label += ' (#{value})'.interpolate({value: model.logic.l()});
      }

      document.getElementById('logic-label').innerHTML = label;
    }
  }

  if(attribute){
    events[attribute]();
  }else{
    Object.keys(events).forEach(function(event){
      events[event]();
    });    
  }
}

function eventLocale(key){
  I18n.locale = key;

  document.getElementById('title').innerHTML = I18n.t('others.title');

  document.getElementById('language').innerHTML = I18n.t('others.language');
  document.getElementById('en-label').innerHTML = I18n.t('others.en');
  document.getElementById('pt-br-label').innerHTML = I18n.t('others.pt-BR');

  document.getElementById('form').innerHTML = I18n.t('others.form');
  eventSetLabel();
  eventSetValue();
  model.isValid;
  eventSetError();

  document.getElementById('new').innerHTML = I18n.t('others.new');
  document.getElementById('reset').innerHTML = I18n.t('others.reset');
  document.getElementById('submit').innerHTML = I18n.t('others.submit');
}