/*

  over.js - BETA
  Elegant function overloading in JavaScript.

  by Mat Ryer and Ryan Quinn
  Copyright (c) 2013 Stretchr, Inc.

  Please consider promoting this project if you find it useful.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
  to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies
  or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
  FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
  DEALINGS IN THE SOFTWARE.

*/
(function(global){

  global.MakeOver = function(){
    return function(){

      // get the mapping
      var $map = global.Over.map.apply(this, arguments);

      return function(){

        for (var i in $map) {
          if (global.Over.test($map[i].sig, arguments)) {
            return $map[i].func.apply(this, arguments);
          }
        }
      };

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
  global.Over._isType = function(t,v){ return typeof(v)===t; };
  global.Over.is = {
    "string": function(v){ return global.Over._isType("string", v); },
    "number": function(v){ return global.Over._isType("number", v); },
    "object": function(v){ return v != null && global.Over._isType("object", v) && typeof(v.length)==="undefined"; },
    "array": function(v){ return v != null && global.Over._isType("object", v) && typeof(v.length)!=="undefined"; },
    "boolean": function(v){ return global.Over._isType("boolean", v); },
    "function": function(v){ return global.Over._isType("function", v); },
    "null": function(v){ return v === null; },
    "undefined": function(v){ return global.Over._isType("undefined", v); },
    "nothing": function(v){ return global.Over.is["null"](v) || global.Over.is["undefined"](v) },
    "etc": function(){ return global.Over.etc; }
  };

  // shortcuts
  global.Over.is.bool = global.Over.is["boolean"];

  /**
   * A special reference object that means whatever the arguments are,
   * they're OK.
   */
  global.Over.etc = {};

  /**
   * Creates a list of signatures mapped to the handler functions.
   */
  global.Over.map = function(){

    var items = [];

    for (var i in arguments) {
      var func = arguments[i];
      items.push({
        "sig": global.Over.signature(func),
        "func": func
      });
    }

    return items;

  };

  /**
   * Checks arguments against a signature array.
   */
  global.Over.test = function(sig, args){

    for (var i = 0; i < Math.max(sig.length, args.length); i++) {

      var sigItem = sig[i];
      var argItem = args[i];

      if (typeof(sigItem)==="undefined") {
        // no sig item
        return false;
      }

      var result;
      try {
        result = sigItem(argItem);
      } catch(e) {
        console.warn(e)
        return false;
      }

      if (result === false) {
        return false;
      } else if (result === global.Over.etc) {
        return true;
      }

    }

    return true;
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
      var checker = global.Over.is[global.Over.checkFuncFromArg(arg)];
      if (typeof(checker)==="undefined") {
        console.warn("over.js: Unknown checker for '" + arg + "'.  Try adding Over.is[\"" + arg + "\"] = function(v){};")
      }
      sig.push(checker);
    }

    return sig;

  };

  /**
   * Gets the names of all
   */
  global.Over.argnames = function(f){
    var names = f.toString().split("(")[1].split(")")[0].split(",");
    for (var i in names) names[i] = names[i].replace(/^\s+|\s+$/g, '');
    return names;
  };

  /**
   * Gets the name of the checker func from an argument.r
   */
  global.Over.checkFuncFromArg = function(arg){
    return arg.split("$")[1];
  }

})(window);
