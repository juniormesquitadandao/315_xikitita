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
      eventSet();
    },
    decimal: function(){
      var value = numeral().unformat(element.value);
      model.decimal = value;
      eventSet();
    },
    date: function(){
      model.date = element.value;
    },
    time: function(){
      model.time = element.value;
    },
    datetime: function(){
      model.datetime = element.value;
    },
    logic: function(){
      model.logic = element.value;
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

function eventSet(){

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
      document.getElementById('time').value = model.time.l();
    },
    datetime: function(){
      document.getElementById('datetime').value = model.datetime.l();
    },
    logic: function(){
      document.getElementById('logic').checked = model.logic;
    }
  }

  Object.keys(events).forEach(function(event){
    events[event]();
  });  
}