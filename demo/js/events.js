function eventLoad(){
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
      var value = numeral().unformat(element.value);
      model.integer = value;
      eventSet('integer');
    },
    decimal: function(){
      var value = numeral().unformat(element.value);
      model.decimal = value;

      if(/\.\d{2}/.test(element.value)){
        eventSet('decimal');
      }
    },
    date: function(){
      var value = moment(element.value, 'YYYY-MM-DD').toDate();
      model.date = value;
      
      if(element.value.replace(/-/g, '').length == 8){
        eventSet('date');
      }
    },
    time: function(){
      var value = moment(element.value, 'HH:mm').toDate();
      model.time = value;
      
      if(element.value.replace(':', '').length == 4){
        eventSet('time');
      }
    },
    datetime: function(){
      var value = moment(element.value, 'YYYY-MM-DD HH:mm').toDate();
      model.datetime = value;

      if(element.value.replace(':', '').replace(/-/g, '').replace(/\s/g, '').length == 12){
        eventSet('datetime');
      }
    },
    logic: function(){
      model.logic = element.checked;
      eventSet('logic');
    }
  }

  events[element.id]();

}

function eventNew(){
  eventSet();
}

function eventReset(){
  model.reset;
  eventSet();
}

function eventSet(attribute){

  var events = {
    text: function(){
      document.getElementById('text').value = model.text;
    },
    integer: function(){
      document.getElementById('integer').value = model.integer.l();
    },
    decimal: function(){
      document.getElementById('decimal').value = model.decimal.l();
    },
    date: function(){
      document.getElementById('date').value = model.date.l();
    },
    time: function(){
      document.getElementById('time').value = model.time.l({dateType: 'time', format: 'long'});
    },
    datetime: function(){
      document.getElementById('datetime').value = model.datetime.l({dateType: 'datetime', format: 'medium'});
    },
    logic: function(){
      document.getElementById('labelLogic').innerHTML = 'Logic(#{value})'.interpolate({value: model.logic.l()})
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