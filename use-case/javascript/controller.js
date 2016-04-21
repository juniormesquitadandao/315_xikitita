var Controller = function(){

  return {
    index: function(params){

    },
    show: function(id){

    },
    new: function(){
      model = new Model();
    },
    edit: function(id){
      model = new Model(models[id]);
    },
    create: function(){
      if(model.isValid){
        if( !model.id ){
          model.id = models.length + 1;
          models.push(model);
        } else {
          models[model.id - 1] = model;
        }
        this.new();
      }
    },
    update: function(){

    },
    destroy: function(id){
      models.splice(id, 1);

      models.forEach(function(model, index){
        model.id = index + 1;
      });
    }
  }

}(this);