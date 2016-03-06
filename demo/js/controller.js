var Controller = function(){

  return {
    index: function(params){

    },
    show: function(id){

    },
    new: function(){
      model = new Model();
    },
    edit: function(){

    },
    create: function(){
      if(model.isValid){
        models.push(model);
        this.new();
      }
    },
    update: function(){

    },
    destroy: function(){

    }
  }

}(this);