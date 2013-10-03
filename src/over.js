(function(global){

  global.MakeOver = function(){
    return function(){};
  };

  global.Over = global.MakeOver();
  global.Over.signature = function(){



  };

  /**
   * Gets the names of all
   */
  global.Over.argnames = function(f){
    return f.toString().split("(")[1].split(")")[0].split(", ");
  };

})(window);
