function eventLoad(){
  model = new Model({
    text: 'text',
    integer: 9,
    decimal: 9.99,
    date: new Date(),
    time: new Date(),
    datetime: new Date(),
    logic: true
  });

  eventNew();
}

function eventBind(element){
  model[element.id] = element.value;
}

function eventNew(){
  eventSet();
}

function eventReset(){
  model.reset;
  eventSet();
}

function eventSet(){
  Object.keys(model).forEach(function(key){
    var attribute = 'value';
    if(key === 'logic'){
      attribute = 'checked'
    }

    var value = model[key];
    if(value){
      value = I18n.l(value);
    }
    document.getElementById(key)[attribute] = value;
  });  
}