(function(global){

  global.MakeOver = function(){
    return function(){

    };
  };

  /**
   * MakeOver makes a new Over function (useful for testing).
   */
  global.Over = global.MakeOver();

  /**
   * An object containing functions that can check individual arguments
   * and make decisions on whether they are indeed something or not.
   */
  global.Over.is = {
    "string": function(v){ return typeof(v)==="string"; },
    "number": function(v){ return typeof(v)==="number"; },
    "object": function(v){ return typeof(v)==="object" && typeof(v.length)==="undefined"; },
    "array": function(v){ return typeof(v)==="object" && typeof(v.length)!=="undefined"; },
    "etc": function(){ return global.Over.etc; }
  };

  /**
   * A special reference object that means whatever the arguments are,
   * they're OK.
   */
  global.Over.etc = {};

  /**
   * Checks arguments against a signature array.
   */
  global.Over.test = function(sig, args){

    var result = true;
    for (var i = 0; i < Math.max(sig.length, args.length); i++) {

      var sigItem = sig[i];
      var argItem = args[i];

      if (typeof(sigItem)==="undefined") {
        // no sig item
        return false;
      }

      try {
        result = sigItem(argItem);
      } catch(e) {
        return false;
      }

      if (result === false) {
        return false;
      } else if (result === global.Over.etc) {
        return true;
      }

    }

    return result;
  };

  /**
   * Gets an array of is methods to be called to test a
   * method call, based on the specified function.
   */
  global.Over.signature = function(f){

    var sig = [];
    var args = global.Over.argnames(f);
    for (var argI in args) {
      var arg = args[argI];
      sig.push(global.Over.is[global.Over.checkFuncFromArg(arg)]);
    }

    return sig;

  };

  /**
   * Gets the names of all
   */
  global.Over.argnames = function(f){
    return f.toString().split("(")[1].split(")")[0].split(", ");
  };

  /**
   * Gets the name of the checker func from an argument.r
   */
  global.Over.checkFuncFromArg = function(arg){
    return arg.split("$")[1];
  }

})(window);
